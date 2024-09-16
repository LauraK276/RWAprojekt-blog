import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/user.entity'; // Import User entiteta

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Dodaj ovo kako bi User bio dostupan u ovom modulu
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
