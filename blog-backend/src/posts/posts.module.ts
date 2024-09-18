import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './post.entity';
import { User } from '../users/user.entity'; 
import { Comment } from '../comments/comment.entity';
import { Like } from '../likes/like.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Comment, Like])], // Dodaj Like ovdje
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}

