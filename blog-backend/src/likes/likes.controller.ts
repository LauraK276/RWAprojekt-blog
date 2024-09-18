import { Controller, Post, Delete, Get, Param, UseGuards, Request } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async addLike(@Param('postId') postId: number, @Request() req) {
    await this.likesService.addLike(postId, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  async removeLike(@Param('postId') postId: number, @Request() req) {
    await this.likesService.removeLike(postId, req.user.userId);
  }

  @Get(':postId')
  async getLikesForPost(@Param('postId') postId: number) {
    return this.likesService.getLikesForPost(postId);
  }
}
