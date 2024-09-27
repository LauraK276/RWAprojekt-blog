import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Logika za dohvaćanje korisničkog profila
  async getProfile(userId: number): Promise<UserDto> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('Korisnik nije pronađen');
    }
    
    // Ukloni lozinku iz korisničkog objekta prije vraćanja
    const { password, ...userWithoutPassword } = user;
    
    return new UserDto(userWithoutPassword);
  }


  // Logika za ažuriranje korisničkog profila
  async updateProfile(userId: number, body: { username: string; password?: string }): Promise<UserDto> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('Korisnik nije pronađen');
    }

    // Ažuriraj korisničko ime ako je poslano
    if (body.username) {
      user.username = body.username;
    }

    // Ažuriraj lozinku ako je poslana
    if (body.password) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(body.password, saltRounds);
    }

    // Spremi ažurirane podatke korisnika u bazu
    const updatedUser = await this.usersRepository.save(user);
    return new UserDto(updatedUser);
  }
}
