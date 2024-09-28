import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  // Dohvati profil prijavljenog korisnika
  @UseGuards(JwtAuthGuard)
@Get('profile')
async getProfile(@Request() req) {
  console.log('getProfile - userId iz tokena:', req.user.userId);  // Ispis userId-a iz tokena
  const user = await this.authService.getProfile(req.user.userId);
  return user;
}




  // Ažuriraj profil prijavljenog korisnika (korisničko ime i/ili lozinku)
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(
    @Request() req,
    @Body() body: { username: string; password: string }
  ) {
    return this.authService.updateProfile(req.user.userId, body.username, body.password);
  }
  
}
