import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Redis from 'ioredis';
import { MovieMatch } from '../../entities/movie-match.entity';
import { CreateSessionDto } from './dto/movie-match.dto';

@Injectable()
export class MovieMatchingService {
  private readonly sessionTTL = 7200; // 2 hours in seconds

  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis,
    @InjectRepository(MovieMatch)
    private readonly movieMatchRepository: Repository<MovieMatch>,
  ) {}

  private getSessionKey(sessionId: string): string {
    return `session:${sessionId}:users`;
  }

  private getLikesKey(sessionId: string, userId: string): string {
    return `session:${sessionId}:likes:${userId}`;
  }

  private getDislikesKey(sessionId: string, userId: string): string {
    return `session:${sessionId}:dislikes:${userId}`;
  }

  private getQueueKey(sessionId: string): string {
    return `session:${sessionId}:movie_queue`;
  }

  async createSession(createSessionDto: CreateSessionDto): Promise<string> {
    const { user1_id, user2_id } = createSessionDto;

    if (user1_id === user2_id) {
      throw new BadRequestException('Users in session must be different');
    }

    const sessionId = Math.random().toString(36).substring(2, 15);
    const sessionKey = this.getSessionKey(sessionId);

    try {
      await this.redis
        .multi()
        .sadd(sessionKey, [user1_id, user2_id])
        .expire(sessionKey, this.sessionTTL)
        .exec();

      return sessionId;
    } catch (error) {
      throw new BadRequestException('Failed to create session');
    }
  }

  async addMoviesToQueue(sessionId: string, movieIds: number[]): Promise<void> {
    const sessionKey = this.getSessionKey(sessionId);
    const sessionExists = await this.redis.exists(sessionKey);

    if (!sessionExists) {
      throw new NotFoundException('Session not found');
    }

    const queueKey = this.getQueueKey(sessionId);

    if (movieIds.length > 0) {
      try {
        await this.redis
          .multi()
          .rpush(queueKey, ...movieIds.map(String))
          .expire(queueKey, this.sessionTTL)
          .exec();
      } catch (error) {
        throw new BadRequestException('Failed to add movies to queue');
      }
    }
  }

  async getMatches(userId: string): Promise<MovieMatch[]> {
    return this.movieMatchRepository.find({
      where: [{ user1_id: userId }, { user2_id: userId }],
      order: { matched_at: 'DESC' },
    });
  }
}
