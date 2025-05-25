import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEquipamentTypeDto } from '../dto/create-equipament-type.dto';
import { UpdateEquipamentTypeDto } from '../dto/update-equipament-type.dto';

@Injectable()
export class EquipamentTypeFunctionsService extends PrismaService {
    async existName(name: string) {
        return 0 < await this.equipamentType.count({
            where: {
                name: name,
            },
        });
    }

    async exist(id: number) {
        return 0 < await this.equipamentType.count({
            where: {
                id: id,
            },
        });
    }

    async canUpdate(id: number, name: string) {
        const eq = await this.equipamentType.findFirst({
            where: {
                name: name,
            },
        });

        if (eq && eq.id !== id) {
            return false;
        }

        return true;
    }

    async create(data: CreateEquipamentTypeDto) {
        return await this.equipamentType.create({
            data,
        });
    }

    async delete(id: number) {
        return await this.equipamentType.delete({
            where: {
                id: id,
            },
        });
    }

    async find(id: number) {
        return await this.equipamentType.findUnique({
            where: {
                id: id,
            },
            include: {
                FieldType: true,
                LicenseType: true,
                EventType: true,
            }
        });
    }

    async list({ skip, take }: { skip?: number, take?: number }) {
        return await this.equipamentType.findMany({
            skip,
            take,
        });
    }

    async update(id: number, data: UpdateEquipamentTypeDto) {
        return await this.equipamentType.update({
            where: {
                id: id,
            },
            data,
        });
    }

}
