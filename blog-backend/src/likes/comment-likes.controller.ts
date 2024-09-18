import { Controller, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comment-likes') // Provjeri je li ovdje točno definirano
export class CommentLikesController {
  constructor(private readonly commentLikesService: CommentLikesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':commentId')
  async addLike(@Param('commentId') commentId: number, @Request() req) {
    await this.commentLikesService.addLike(commentId, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
  async removeLike(@Param('commentId') commentId: number, @Request() req) {
    await this.commentLikesService.removeLike(commentId, req.user.userId);
  }
}
