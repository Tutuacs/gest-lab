import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateEquipamentDto } from '../dto/update-equipament.dto';
import { CreateEquipamentDto } from '../dto/create-equipament.dto';
import { CERTIFIED_STATUS, EQUIPAMENT_STATUS } from '@prisma/client';
import { FilterEquipamentDto } from '../dto/filter-equipament.dto';

@Injectable()
export class EquipamentFunctionsService extends PrismaService {
    async existCombination(patrimonio: string, tag: string, serie: string, locationId: number) {
        const patrimonioExist = await this.equipament.findFirst({
            where: {
                patrimonio: patrimonio,
            },
        })

        const serieExist = await this.equipament.findFirst({
            where: {
                serie: serie,
            },
        })

        const tagExist = await this.equipament.findFirst({
            where: {
                tag: tag,
                locationId: locationId,
            },
        })

        if (patrimonioExist || serieExist || tagExist) {
            return true
        }

        return false
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
            data: {
                name: data.name,
                brand: data.brand,
                categoryId: data.categoryId,
                next_maintenance: data.next_maintenance,
                maintenance_periodicity: data.maintenance_periodicity,
                description: data.description,
                patrimonio: data.patrimonio,
                tag: data.tag,
                serie: data.serie,
                locationId: data.locationId,
                status: data.status,
                Certified: {
                    create: {
                        from: new Date(),
                        to: new Date(),
                        valid: CERTIFIED_STATUS.EXPIRED,
                        description: data.certifiedDescription,
                        needsRenovation: data.certifiedNeedsRenovation,
                        renovateInYears: data.certifiedRenovateInYears,
                    }
                }
            }
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
                brand: true,
                categoryId: true,
                description: true,
                patrimonio: true,
                tag: true,
                serie: true,
                locationId: true,
                status: true,
                next_maintenance: true,
                maintenance_periodicity: true,
                _count: {
                    select: {
                        Event: true,
                    }
                },
                Location: true,
                Category: true,
                Certified: true,
            }
        });
    }

    async pendents(locationId: number, periodicity: number) {
        const today = new Date();
        // add 30 days from today
        const nextMonth = new Date(today.getFullYear(), today.getMonth() , today.getDate() + periodicity);
        return await this.equipament.findMany({
            where: {
                ...(locationId != 0 && { locationId }),
                next_maintenance: {
                    lte: nextMonth,
                },
                OR: [
                    {
                        status: EQUIPAMENT_STATUS.MAINTENANCE,
                    },
                    {
                        Certified: {
                            needsRenovation: true,
                            OR: [
                                {
                                    to: {
                                        lte: nextMonth,
                                    },
                                },
                                {
                                    valid: CERTIFIED_STATUS.EXPIRED,
                                }
                            ]
                        }
                    },
                ],
            },
            include: {
                Event: {
                    take: 1,
                },
                Certified: true,
                Location: true,
                Category: true,
            },
            orderBy: {
                Certified: {
                    to: 'asc',
                }
            }
        });
    }

    async list({ skip, take, brand, locationId, status, search }: FilterEquipamentDto) {
        return await this.equipament.findMany({
            skip,
            take,
            where: {
                ...(brand && { brand }),
                ...(locationId != 0 && { locationId }),
                ...(status && { status }),
                ...(search && {
                    OR: [
                        { serie: { contains: search } },
                        { patrimonio: { contains: search } },
                        { tag: { contains: search } },
                    ]
                }),
            },
            include: {
                Certified: true,
                Location: true,
                Category: true,
            }
        });
    }

    async update(id: number, data: UpdateEquipamentDto) {
        return await this.equipament.update({
            where: {
                id: id,
            },
            data,
            include: {
                Certified: true,
                Location: true,
                Category: true,
            }
        });
    }

}
