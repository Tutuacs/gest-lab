import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE } from '@prisma/client';
import { ACCESS_KEY } from 'src/decorators';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requeridRoles = this.reflector.getAllAndOverride<ROLE[]>(ACCESS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requeridRoles) {
      return true;
    }

    const { profile } = context.switchToHttp().getRequest();

    const rolesFilted = requeridRoles.filter((role) => role === profile.role);

    return rolesFilted.length > 0;
  }
}
