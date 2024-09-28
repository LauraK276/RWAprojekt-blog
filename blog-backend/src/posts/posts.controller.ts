/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentsService } from '../comments/comments.service'; // Importiraj CommentsService

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService // Dodaj CommentsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() body: { title: string; content: string }, @Request() req) {
    return this.postsService.createPost(body.title, body.content, { userId: req.user.userId });
  }

  @Get()
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: number) {
    return this.postsService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() body: { title: string; content: string },
  ) {
    return this.postsService.updatePost(id, body.title, body.content);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return this.postsService.deletePost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-posts')
  async getMyPosts(@Request() req) {
    return this.postsService.getPostsByUser(req.user.userId);
  }

  // Nova ruta za dohvaćanje komentara
  @Get(':id/comments')
  async getComments(@Param('id') postId: number) {
    return this.commentsService.getCommentsForPost(postId);
  }
}
