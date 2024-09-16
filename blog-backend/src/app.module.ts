import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Postavi na global kako ne bismo morali ponovno importirati u drugim modulima
    }),
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
