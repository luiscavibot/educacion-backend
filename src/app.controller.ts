import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';
// import { TokenValidateGuard } from './modules/auth/guards/token-validate.guard';
import { ReqUserDto } from './modules/users/dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: ReqUserDto) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/validate')
  async validate(@Request() req: ReqUserDto) {
    return req.user;
  }
}
