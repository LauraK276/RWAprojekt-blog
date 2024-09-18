import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/user.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService, // Dodaj JwtService
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

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Neispravno korisničko ime ili lozinka.');
    }

    // Provjeri lozinku
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Neispravno korisničko ime ili lozinka.');
    }

    // Generiraj JWT token
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
