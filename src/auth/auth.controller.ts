import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import express from 'express';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { RefeshJwtGuard } from './guards/refresh-jwt.guard';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: express.Request) {
    const { id } = req.user as Usuario;
    return this.authService.login(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @UseGuards(RefeshJwtGuard)
  refreshToken(@Req() req: express.Request) {
    const { id } = req.user as Usuario;
    return this.authService.refreshToken(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('signout')
  @UseGuards(JwtGuard)
  async signOut(@Req() req: express.Request) {
    const { id } = req.user as Usuario;
    await this.authService.signOut(id);
  }
}
