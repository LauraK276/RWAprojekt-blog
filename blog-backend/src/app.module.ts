import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/post.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comment.entity';
import { LikesModule } from './likes/likes.module';
import { Like } from './likes/like.entity';
import { CommentLike } from './likes/comment-like.entity';
import { CommentLikesModule } from './likes/comment-likes.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Konfiguracija okruženja (.env)
    ConfigModule.forRoot({
      isGlobal: true,  // Osigurava da je ConfigModule globalan kroz cijelu aplikaciju
    }),
    // TypeORM konfiguracija pomoću ConfigService
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],  // Uvođenje ConfigService za dinamičku konfiguraciju
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',  // Koristi SQLite bazu podataka
        database: configService.get<string>('DB_DATABASE', 'blog-db.sqlite'),  // Učitaj ime baze iz .env ili koristi zadanu vrijednost
        entities: [User, Post, Comment, Like, CommentLike],  // Definiraj sve entitete
        synchronize: true,  // Automatska sinkronizacija s bazom podataka (nije preporučeno u produkciji)
      }),
    }),
    // Ostali moduli
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
export class AppModule {
  constructor() {
    // Ispisuje konfiguraciju baze podataka prilikom pokretanja
    console.log({
      type: 'sqlite',
      database: 'blog-db.sqlite',
      entities: [User, Post, Comment, Like, CommentLike],
      synchronize: true,
    });
  }
}
