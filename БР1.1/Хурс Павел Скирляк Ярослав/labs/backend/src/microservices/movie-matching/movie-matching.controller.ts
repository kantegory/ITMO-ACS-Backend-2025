import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { MovieMatchingService } from './movie-matching.service';
import { MovieMatch } from '../../entities/movie-match.entity';
import { CreateSessionDto, MovieQueueDto } from './dto/movie-match.dto';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';

@ApiTags('movie-matching')
@Controller('movie-matching')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MovieMatchingController {
  constructor(private readonly movieMatchingService: MovieMatchingService) {}

  @Post('sessions')
  @ApiOperation({
    summary: 'Create a new matching session',
    description:
      'Creates a new movie matching session between two users with a 2-hour TTL.',
  })
  @ApiBody({ type: CreateSessionDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Session created successfully.',
    schema: {
      type: 'object',
      properties: {
        sessionId: {
          type: 'string',
          example: 'abc123def456',
        },
      },
    },
  })
  async createSession(
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<{ sessionId: string }> {
    const sessionId =
      await this.movieMatchingService.createSession(createSessionDto);
    return { sessionId };
  }

  @Post('sessions/:sessionId/queue')
  @ApiOperation({
    summary: 'Add movies to the session queue',
    description:
      'Adds a list of TMDb movie IDs to the session queue for matching.',
  })
  @ApiBody({ type: MovieQueueDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Movies added to queue successfully.',
  })
  async addMoviesToQueue(
    @Param('sessionId') sessionId: string,
    @Body() queueDto: MovieQueueDto,
  ): Promise<void> {
    await this.movieMatchingService.addMoviesToQueue(
      sessionId,
      queueDto.movieIds,
    );
  }

  @Get('matches/:userId')
  @ApiOperation({ summary: 'Get all movie matches for a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the list of movie matches.',
    type: [MovieMatch],
  })
  async getMatches(@Param('userId') userId: string): Promise<MovieMatch[]> {
    return this.movieMatchingService.getMatches(userId);
  }

  @MessagePattern('get_user_matches')
  async getUserMatches(userId: string): Promise<MovieMatch[]> {
    return this.movieMatchingService.getMatches(userId);
  }
}
