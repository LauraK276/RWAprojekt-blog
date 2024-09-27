import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Ovdje registriraj User entitet
    // Dodaj i ostale module
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
