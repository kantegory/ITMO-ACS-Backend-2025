import { AppDataSource } from '../config/databaseConfig';
import { Chat } from '../entities/Chat';
import { Message } from '../entities/Message';
import { UserRole } from '../entities/UserRole';

class ChatService {
  public repo = AppDataSource.getRepository(Chat);
  private messageRepo = AppDataSource.getRepository(Message);

  private async getPropertyInfo(propertyId: number) {
    const res = await fetch(`${process.env.PROPERTY_SERVICE_URL}/api/properties/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${process.env.SERVICE_KEY}`,
      }
    });
    if (!res.ok) throw { status: res.status, message: 'Property not found' };
    return res.json();
  }

  async startChat(user: any, propertyId: number): Promise<{ chat: Chat; isNew: boolean }> {
    if (!user || user.role !== UserRole.TENANT) {
      throw { status: 403, message: 'Only tenants can start a chat' };
    }

    const property = await this.getPropertyInfo(propertyId);

    let chat = await this.repo.findOne({
      where: { propertyId, tenantId: user.userId },
    });
    if (chat) {
      return { chat, isNew: false };
    }

    chat = this.repo.create({
      propertyId,
      tenantId: user.userId,
      landlordId: property.ownerId,
    });
    await this.repo.save(chat);
    return { chat, isNew: true };
  }

  async getAllChats(user: any): Promise<Chat[]> {
    if (!user) throw { status: 403, message: 'User not authenticated' };

    switch (user.role) {
      case UserRole.ADMIN:
        return this.repo.find();
      case UserRole.LANDLORD:
        return this.repo.find({ where: { landlordId: user.userId } });
      case UserRole.TENANT:
        return this.repo.find({ where: { tenantId: user.userId } });
      default:
        throw { status: 403, message: 'Access denied' };
    }
  }

  async getChatById(user: any, chatId: number): Promise<Chat> {
    if (!user) throw { status: 403, message: 'User not authenticated' };

    const chat = await this.repo.findOne({ where: { id: chatId } });
    if (!chat) throw { status: 404, message: 'Chat not found' };

    if (user.role === UserRole.ADMIN) return chat;
    if (user.role === UserRole.LANDLORD && chat.landlordId === user.userId) return chat;
    if (user.role === UserRole.TENANT && chat.tenantId === user.userId) return chat;

    throw { status: 403, message: 'Access denied' };
  }

  async sendMessage(user: any, chatId: number, content: string): Promise<Message> {
    if (!user) throw { status: 403, message: 'User not authenticated' };
    if (!content || typeof content !== 'string')
      throw { status: 400, message: 'Message content is required' };

    const chat = await this.repo.findOne({ where: { id: chatId } });
    if (!chat) throw { status: 404, message: 'Chat not found' };

    const isTenant = user.role === UserRole.TENANT && chat.tenantId === user.userId;
    const isLandlord = user.role === UserRole.LANDLORD && chat.landlordId === user.userId;
    if (!isTenant && !isLandlord) throw { status: 403, message: 'Access denied' };

    const receiverId =
      user.role === UserRole.TENANT ? chat.landlordId : chat.tenantId;

    const message = this.messageRepo.create({
      chat: chat,
      senderId: user.userId,
      receiverId: receiverId,
      content,
    });
    return this.messageRepo.save(message);
  }
}

export default new ChatService();
