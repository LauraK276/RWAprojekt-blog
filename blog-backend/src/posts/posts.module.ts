import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './post.entity';
import { User } from '../users/user.entity'; // Importiraj User entitet

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]), // Dodaj User ovdje
  ],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
