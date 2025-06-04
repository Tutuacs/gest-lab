import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateEquipamentDto } from '../dto/update-equipament.dto';
import { CreateEquipamentDto } from '../dto/create-equipament.dto';

@Injectable()
export class EquipamentFunctionsService extends PrismaService {
    async existCombination(patrimonio: string, tag: string, serie: string) {
        return 0 < await this.equipament.count({
            where: {
                patrimonio: patrimonio,
                tag: tag,
                serie: serie,
            },
        });
    }

    async exist(id: number) {
        return 0 < await this.equipament.count({
            where: {
                id: id,
            },
        });
    }

    async canUpdate(id: number, patrimonio: string, tag: string, serie: string) {
        const eq = await this.equipament.findFirst({
            where: {
                patrimonio: patrimonio,
                tag: tag,
                serie: serie,
            },
        });

        if (eq && eq.id !== id) {
            return false;
        }

        return true;
    }

    async create(data: CreateEquipamentDto) {
        return await this.equipament.create({
            data,
        });
    }

    async delete(id: number) {
        return await this.equipament.delete({
            where: {
                id: id,
            },
        });
    }

    async find(id: number) {
        return await this.equipament.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                description: true,
                patrimonio: true,
                tag: true,
                serie: true,
                locationId: true,
                status: true,
                location: true,
                type: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        EventType: true,
                        FieldType: true,
                        LicenseType: true,
                    },
                },
                Fields: {
                    select: {
                        id: true,
                        value: true,
                        fieldType: true,
                    },
                },
                Event: {
                    select: {
                        id: true,
                        description: true,
                        from: true,
                        to: true,
                        value: true,
                        eventType: true,
                    },
                },
                License: {
                    select: {
                        id: true,
                        from: true,
                        to: true,
                        valid: true,
                        LicenseType: true,
                        PDF: true,
                    }
                }
            }
        });
    }

    async list({ skip, take }: { skip?: number, take?: number }) {
        return await this.equipament.findMany({
            skip,
            take,
        });
    }

    async update(id: number, data: UpdateEquipamentDto) {
        return await this.equipament.update({
            where: {
                id: id,
            },
            data,
        });
    }

}
