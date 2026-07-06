import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { AuthJwtPayload } from '../dto/types/auth-jwtPayload';
import type { ConfigType } from '@nestjs/config';
import refreshJwtConfig from 'src/config/refresh-jwt.config';
import { AuthService } from '../auth.service';
import type { Request } from 'express';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: refreshJwtConfiguration.secret as string,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: AuthJwtPayload) {
    const authorization = req.get('authorization');

    if (!authorization) {
      throw new UnauthorizedException('Falta el header de authorization');
    }

    const refreshToken = authorization.replace('Bearer', '').trim();
    const usuarioId = payload.sub;
    return this.authService.validateRefreshToken(usuarioId, refreshToken);
  }
}
