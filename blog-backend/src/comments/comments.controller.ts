import { Controller, Post, Get, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async addComment(
    @Param('postId') postId: number,
    @Body('content') content: string,
    @Request() req
  ) {
    return this.commentsService.addComment(postId, content, req.user.userId);
  }

  @Get(':postId')
  async getCommentsForPost(@Param('postId') postId: number) {
    return this.commentsService.getCommentsForPost(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: number, @Request() req) {
    return this.commentsService.deleteComment(commentId, req.user.userId);
  }
}
