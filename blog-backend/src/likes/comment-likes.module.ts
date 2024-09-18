import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentLikesService } from './comment-likes.service';
import { CommentLikesController } from './comment-likes.controller';
import { CommentLike } from './comment-like.entity';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentLike, Comment, User])],
  providers: [CommentLikesService],
  controllers: [CommentLikesController],
})
export class CommentLikesModule {}
