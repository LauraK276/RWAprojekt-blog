import { Controller, Put, Get, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('users')  // Ruta je /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')  // Ruta je /users/profile
  async getProfile(@Request() req) {
    return this.usersService.getProfile(req.user.userId);
  }



  // Ruta za ažuriranje korisničkog profila
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(
    @Request() req,
    @Body() body: { username: string; password?: string },
  ) {
    return this.usersService.updateProfile(req.user.userId, body);
  }
}



