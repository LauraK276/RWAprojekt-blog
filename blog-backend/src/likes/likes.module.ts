/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Like } from './like.entity';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Post, User])],
  providers: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}
