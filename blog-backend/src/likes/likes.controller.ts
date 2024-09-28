/* eslint-disable prettier/prettier */
import { Controller, Post, Delete, Get, Param, UseGuards, Request } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Post as PostEntity } from '../posts/post.entity';
 // Importiraj Post entitet ako je potreban

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
@Post(':postId')
async addLike(@Param('postId') postId: number, @Request() req): Promise<PostEntity> {
  const updatedPost = await this.likesService.addLike(postId, req.user.userId);
  console.log('Vraćam ažurirani post iz LikesController:', updatedPost);
  return updatedPost; // Vraća ažurirani post
}

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  async removeLike(@Param('postId') postId: number, @Request() req): Promise<PostEntity> {
    return this.likesService.removeLike(postId, req.user.userId); // Vraća ažurirani post nakon uklanjanja lajkova
  }

  @Get(':postId')
  async getLikesForPost(@Param('postId') postId: number) {
    return this.likesService.getLikesForPost(postId);
  }
}
