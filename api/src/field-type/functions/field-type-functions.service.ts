import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFieldTypeDto } from '../dto/create-field-type.dto';
import { UpdateFieldTypeDto } from '../dto/update-field-type.dto';

@Injectable()
export class FieldTypeFunctionsService extends PrismaService {
    async exist(id: number) {
        return 0 < await this.fieldType.count({
            where: {
                id: id,
            },
        });
    }

    async existCombination(name: string, equipamentTypeId: number) {
        return 0 < await this.fieldType.count({
            where: {
                name,
                equipamentTypeId,
            },
        });
    }

    async create(data: CreateFieldTypeDto) {
        return await this.fieldType.create({
            data,
        });
    }

    async delete(id: number) {
        return await this.fieldType.delete({
            where: {
                id: id,
            },
        });
    }

    async find(id: number) {
        return await this.fieldType.findUnique({
            where: {
                id: id,
            },
        });
    }

    async list({ skip, take }: { skip?: number, take?: number }) {
        return await this.fieldType.findMany({
            orderBy: [
                {
                    createdAt: 'desc',
                },
            ],
            skip,
            take,
        });
    }

    async update(id: number, data: UpdateFieldTypeDto) {
        return await this.fieldType.update({
            where: {
                id: id,
            },
            data,
        });
    }
}
