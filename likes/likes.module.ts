import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { CommentLikesService } from './comment-likes/comment-likes.service';
import { CommentLikesController } from './comment-likes/comment-likes.controller';
import { CommentLikesModule } from './comment-likes/comment-likes.module';

@Module({
  providers: [LikesService, CommentLikesService],
  controllers: [LikesController, CommentLikesController],
  imports: [CommentLikesModule]
})
export class LikesModule {}
