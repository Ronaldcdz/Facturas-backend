import { SetMetadata } from '@nestjs/common';
import { Rol } from '../enums/role.enum';

export const ROLES_KEYS = 'roles';
export const Roles = (...roles: [Rol, ...Rol[]]) =>
  SetMetadata(ROLES_KEYS, roles);
