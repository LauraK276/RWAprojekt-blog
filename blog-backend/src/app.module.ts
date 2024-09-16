import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'blog-db.sqlite',
      entities: [User], 
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]), 
    AuthModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
