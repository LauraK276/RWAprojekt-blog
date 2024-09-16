import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard'; 

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  // Zaštićena ruta
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected() {
    return { message: 'Ovo je zaštićen sadržaj, dostupan samo prijavljenim korisnicima.' };
  }
}
