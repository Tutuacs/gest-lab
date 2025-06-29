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
        console.log('request.profile', request.profile);
        if (request.profile.locationId && request.profile.locationId == null && request.profile.role !== ROLE.MASTER) {
          if (!request.params || !request.params.profile) {
            console.log('SRC/DECORATORS/PROFILEAUTH', request.profile);
            console.log('O usuário logado não tem uma locationId definida')
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
      console.log("wt")
      throw new ForbiddenException(
        'Usuário logado não encontrado no banco de dados, Use o AuthGuard para obter o usuário',
      );
    }
  },
);
