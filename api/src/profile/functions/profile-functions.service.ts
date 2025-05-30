import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ROLE } from '@prisma/client';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class ProfileFunctionsService extends PrismaService {
    async exist(id: string) {
        return 0 < await this.profile.count({
            where: {
                id: id,
            },
        });
    }

    async canUpdateRole(loggedRole: string, role: ROLE) {
        if (loggedRole === ROLE.MASTER) {
            return true;
        } else if (loggedRole === ROLE.ADMIN) {
            if (role !== ROLE.USER) {
                return false;
            }
        }

        return true;
    }

    async canUpdateEmail(id: string, email: string) {
        const count = await this.profile.count({
            where: {
                id: { not: id },
                email,
            },
        });

        return count === 0;
    }

    async delete(id: string) {
        return this.profile.delete({
            where: { id },
        });
    }

    async find(id: string) {
        return this.profile.findUnique({
            where: { id },
            include: {
                Local: true,
            }
        });
    }

    async list({ skip, take }: { skip?: number, take?: number }) {
        return this.profile.findMany({
            skip,
            take,
        });
    }

    async update(id: string, data: UpdateProfileDto) {
        return this.profile.update({
            where: { id },
            data,
        });
    }

}
