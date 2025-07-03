import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ROLE } from '@prisma/client';

export const ProfileAuth = createParamDecorator(
  (filterData: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.profile) {
      if (filterData) {
        if (request.profile.locationId && request.profile.locationId == null && request.profile.role !== ROLE.MASTER) {
          if (!request.params || !request.params.profile) {
            throw new ForbiddenException(
              "Usuário logado não tem permissão para acessar este recurso, finalize seu cadastro com um administrador",
            )
          }
        }
        return request.profile[filterData];
      } else {
        return request.profile;
      }
    } else {
      throw new ForbiddenException(
        'Usuário logado não encontrado no banco de dados, Use o AuthGuard para obter o usuário',
      );
    }
  },
);
