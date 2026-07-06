import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEYS } from '../decorators/roles.decorator';
import { Rol } from '../enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRols = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEYS, [
      context.getHandler(),
      context.getClass(),
    ]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = context.switchToHttp().getRequest().user!;
    const hasRequiredRole = requiredRols.some((rol) => user.rol === rol);

    console.log(user);
    console.log(hasRequiredRole);
    console.log(requiredRols);
    return hasRequiredRole;
  }
}
