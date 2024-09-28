/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './post.entity';
import { User } from '../users/user.entity'; 
import { Comment } from '../comments/comment.entity';
import { CommentsService } from '../comments/comments.service'; 
import { Like } from '../likes/like.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Comment, Like])], // Dodaj Like ovdje
  providers: [PostsService, CommentsService], // Uključi CommentsService u providers
  controllers: [PostsController], // CommentsService ne treba biti u controllers
})
export class PostsModule {}
