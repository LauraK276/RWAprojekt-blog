import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../users/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(username: string, password: string): Promise<UserDto> {
    const user = new User();
    user.username = username;

    // Hashiraj lozinku
    const saltRounds = 10;
    user.password = await bcrypt.hash(password, saltRounds);

    const savedUser = await this.usersRepository.save(user);

    // Vratite DTO bez lozinke
    return {
      id: savedUser.id,
      username: savedUser.username,
      isActive: savedUser.isActive,
    };
  }
}
