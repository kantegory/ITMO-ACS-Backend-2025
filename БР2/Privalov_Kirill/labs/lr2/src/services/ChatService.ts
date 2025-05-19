import { AppDataSource } from '../config/databaseConfig';
import { Chat } from '../entities/Chat';
import { Message } from '../entities/Message';
import { Property } from '../entities/Property';
import { User, UserRole } from '../entities/User';

class ChatService {
  public repo = AppDataSource.getRepository(Chat);
  private messageRepo = AppDataSource.getRepository(Message);
  private propertyRepo = AppDataSource.getRepository(Property);
  private userRepo = AppDataSource.getRepository(User);

  async startChat(
    user: any,
    propertyId: number,
  ): Promise<{ chat: Chat; isNew: boolean }> {
    if (!user || user.role !== UserRole.TENANT) {
      throw { status: 403, message: 'Only tenants can start a chat' };
    }

    const property = await this.propertyRepo.findOne({
      where: { id: propertyId },
      relations: ['owner'],
    });
    if (!property) {
      throw { status: 404, message: 'Property not found' };
    }

    const tenant = await this.userRepo.findOneBy({ id: user.userId });
    if (!tenant) {
      throw { status: 404, message: 'Tenant user not found' };
    }

    let chat = await this.repo.findOne({
      where: { property: { id: propertyId } },
      relations: ['property', 'property.owner', 'tenant', 'landlord'],
    });
    if (chat) {
      return { chat, isNew: false };
    }

    chat = this.repo.create({
      property,
      tenant,
      landlord: property.owner,
    });
    await this.repo.save(chat);
    return { chat, isNew: true };
  }

  async getAllChats(user: any): Promise<Chat[]> {
    if (!user) throw { status: 403, message: 'User not authenticated' };

    const relations = ['messages', 'property', 'property.owner'];
    switch (user.role) {
      case UserRole.ADMIN:
        return this.repo.find({ relations });
      case UserRole.LANDLORD:
        return this.repo.find({
          where: { property: { owner: { id: user.userId } } },
          relations,
        });
      case UserRole.TENANT:
        return this.repo.find({
          where: { tenant: { id: user.userId } },
          relations,
        });
      default:
        throw { status: 403, message: 'Access denied' };
    }
  }

  async getChatById(user: any, chatId: number): Promise<Chat> {
    if (!user) throw { status: 403, message: 'User not authenticated' };

    const chat = await this.repo.findOne({
      where: { id: chatId },
      relations: [
        'messages',
        'property',
        'property.owner',
        'tenant',
        'landlord',
      ],
    });
    if (!chat) throw { status: 404, message: 'Chat not found' };

    if (user.role === UserRole.ADMIN) return chat;
    if (
      user.role === UserRole.LANDLORD &&
      chat.property.owner.id === user.userId
    )
      return chat;
    if (user.role === UserRole.TENANT && chat.tenant.id === user.userId)
      return chat;

    throw { status: 403, message: 'Access denied' };
  }

  async sendMessage(
    user: any,
    chatId: number,
    content: string,
  ): Promise<Message> {
    if (!user) throw { status: 403, message: 'User not authenticated' };
    if (!content || typeof content !== 'string')
      throw { status: 400, message: 'Message content is required' };

    const chat = await this.repo.findOne({
      where: { id: chatId },
      relations: ['tenant', 'landlord'],
    });
    if (!chat) throw { status: 404, message: 'Chat not found' };

    const isParticipant =
      (user.role === UserRole.TENANT && chat.tenant.id === user.userId) ||
      (user.role === UserRole.LANDLORD && chat.landlord.id === user.userId);
    if (!isParticipant) throw { status: 403, message: 'Access denied' };

    const sender = this.userRepo.create({ id: user.userId }) as User;
    const receiverId =
      user.role === UserRole.TENANT ? chat.landlord.id : chat.tenant.id;
    const receiver = this.userRepo.create({ id: receiverId }) as User;

    const message = this.messageRepo.create({
      chat,
      sender,
      receiver,
      content,
    });
    return this.messageRepo.save(message);
  }
}

export default new ChatService();
