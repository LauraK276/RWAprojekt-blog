import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/post.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comment.entity';
import { LikesModule } from './likes/likes.module';
import { Like } from './likes/like.entity';
import { CommentLike } from './likes/comment-like.entity'; // Importiraj CommentLike ako ga koristiš
import { CommentLikesModule } from './likes/comment-likes.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'blog-db.sqlite',
      entities: [User, Post, Like, Comment, CommentLike], // Dodaj CommentLike ako ga koristiš
      synchronize: true,
    }),
    AuthModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    CommentLikesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
