import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AuctionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private userSockets: Map<number, Set<string>> = new Map();
  private auctionSubscriptions: Map<number, Set<string>> = new Map();

  constructor(private readonly prisma: PrismaClient) {}

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;
    if (userId) {
      const userIdNum = Number(userId);
      if (!this.userSockets.has(userIdNum)) {
        this.userSockets.set(userIdNum, new Set());
      }
      this.userSockets.get(userIdNum)?.add(client.id);
    }
  }

  async handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId;
    if (userId) {
      const userIdNum = Number(userId);
      this.userSockets.get(userIdNum)?.delete(client.id);
      if (this.userSockets.get(userIdNum)?.size === 0) {
        this.userSockets.delete(userIdNum);
      }
    }
  }

  @SubscribeMessage('subscribeToAuction')
  async handleSubscribeToAuction(client: Socket, auctionId: number) {
    if (!this.auctionSubscriptions.has(auctionId)) {
      this.auctionSubscriptions.set(auctionId, new Set());
    }
    this.auctionSubscriptions.get(auctionId)?.add(client.id);

    // Отправляем текущее состояние аукциона
    const auction = await this.prisma.auction.findUnique({
      where: { auction_id: auctionId },
      include: {
        auction_participants: {
          orderBy: { updated_at: 'desc' },
          take: 10,
          include: { user: true },
        },
      },
    });

    if (auction) {
      client.emit('auctionUpdate', {
        auctionId,
        status: auction.status,
        participants: auction.auction_participants,
      });
    }
  }

  @SubscribeMessage('unsubscribeFromAuction')
  async handleUnsubscribeFromAuction(client: Socket, auctionId: number) {
    this.auctionSubscriptions.get(auctionId)?.delete(client.id);
    if (this.auctionSubscriptions.get(auctionId)?.size === 0) {
      this.auctionSubscriptions.delete(auctionId);
    }
  }

  // Метод для отправки обновлений всем подписчикам аукциона
  async broadcastAuctionUpdate(auctionId: number, data: any) {
    const subscribers = this.auctionSubscriptions.get(auctionId);
    if (subscribers) {
      subscribers.forEach((socketId) => {
        this.server.to(socketId).emit('auctionUpdate', {
          auctionId,
          ...data,
        });
      });
    }
  }

  // Метод для отправки информации о новой ставке
  async broadcastNewBid(auctionId: number, bidData: any) {
    const subscribers = this.auctionSubscriptions.get(auctionId);
    if (subscribers) {
      subscribers.forEach((socketId) => {
        this.server.to(socketId).emit('newBid', {
          auctionId,
          ...bidData,
        });
      });
    }
  }

  // Метод для отправки информации об изменении статуса аукциона
  async broadcastAuctionStatusChange(auctionId: number, status: string) {
    const subscribers = this.auctionSubscriptions.get(auctionId);
    if (subscribers) {
      subscribers.forEach((socketId) => {
        this.server.to(socketId).emit(' auctionStatusChange', {
          auctionId,
          status,
        });
      });
    }
  }
}
