import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { AuthJwtPayload } from './dto/types/auth-jwtPayload';
import refreshJwtConfig from 'src/config/refresh-jwt.config';
import type { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usuarioService: UsuarioService,
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser({ correo, contrasenia }: AuthPayloadDto) {
    const usuario = await this.usuarioService.findByEmail(correo);
    if (!usuario) throw new UnauthorizedException('Usuario no encontrado');

    const contraseniaIgual = await bcrypt.compare(
      contrasenia,
      usuario.contrasenia,
    );
    if (!contraseniaIgual)
      throw new UnauthorizedException('Credenciales Inválidas');

    return usuario;
  }

  async login(usuarioId: number) {
    const { accessToken, refreshToken } = await this.generateTokens(usuarioId);
    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.usuarioService.updateHashedRefreshToken(
      usuarioId,
      hashedRefreshToken,
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(usuarioId: number) {
    const { accessToken, refreshToken } = await this.generateTokens(usuarioId);
    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.usuarioService.updateHashedRefreshToken(
      usuarioId,
      hashedRefreshToken,
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(usuarioId: number) {
    const payload: AuthJwtPayload = {
      sub: usuarioId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshJwtConfiguration),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateRefreshToken(usuarioId: number, refreshToken: string) {
    const usuario = await this.usuarioService.findOne(usuarioId);

    if (!usuario || !usuario.hashedRefreshToken)
      throw new UnauthorizedException('Refesh Token Inválido');

    const refreshTokenIgual = await argon2.verify(
      usuario.hashedRefreshToken,
      refreshToken,
    );
    if (!refreshTokenIgual)
      throw new UnauthorizedException('Refesh Token Inválido');

    return { id: usuarioId };
  }

  async signOut(usuarioId: number) {
    await this.usuarioService.updateHashedRefreshToken(usuarioId, '');
  }

  async validateJwtUser(userId: number) {
    const user = await this.usuarioService.findOne(userId);
    if (!user) throw new UnauthorizedException('Refesh Token Inválido');

    const currentUser: { id: number; rol: number } = {
      id: user.id,
      rol: user.rol,
    };
    return currentUser;
  }
}
