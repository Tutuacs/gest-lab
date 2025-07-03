import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateEquipamentDto } from '../dto/update-equipament.dto';
import { CreateEquipamentDto } from '../dto/create-equipament.dto';
import { CERTIFIED_STATUS, EQUIPAMENT_STATUS, EVENT_TYPE } from '@prisma/client';
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

        console.log("Create Equipament: ", data);

        return await this.equipament.create({
            data: {
                name: data.name,
                brand: data.brand.toLocaleLowerCase(),
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
                        from: data.status == EQUIPAMENT_STATUS.ACTIVE ? data.lastCalibration : new Date(),
                        to: data.status == EQUIPAMENT_STATUS.ACTIVE ? data.certifiedTo : new Date(),
                        valid: data.status == EQUIPAMENT_STATUS.ACTIVE ? CERTIFIED_STATUS.ACTIVE :CERTIFIED_STATUS.EXPIRED,
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
        const today = new Date()
        const nextMonth = new Date()
        nextMonth.setDate(today.getDate() + periodicity)  // adiciona periodicidade de forma robusta

        // condição de intervalo de próxima manutenção
        const maintenanceSchedule = {
            next_maintenance: {
                gte: today,
                lte: nextMonth,
            },
        }

        // condição de equipamento já em manutenção
        const inMaintenance = {
            status: EQUIPAMENT_STATUS.MAINTENANCE,
        }

        // condição de certificado expirado ou por vencer
        const certifiedIssue = {
            Certified: {
                needsRenovation: true,
                OR: [
                    { to: { gte: today, lte: nextMonth } },
                    { valid: CERTIFIED_STATUS.EXPIRED },
                ],
            },
        }

        // monta a lista de filtros para locationId (se for diferente de 0)
        const locationFilter = locationId !== 0 ? { locationId } : {}

        return await this.equipament.findMany({
            where: {
                ...locationFilter,
                OR: [
                    maintenanceSchedule,
                    inMaintenance,
                    certifiedIssue,
                ],
            },
            include: {
                Event: { take: 1 },
                Certified: true,
                Location: true,
                Category: true,
            },
            orderBy: [
                {next_maintenance:  'asc'},
                {Certified: { to: 'asc' }},
            ],
        })
    }


    async list({ skip, take, categoryId, brand, locationId, status, search }: FilterEquipamentDto) {
        return await this.equipament.findMany({
            skip,
            take,
            where: {
                ...(categoryId && { categoryId }),
                ...(brand && {
                    brand: {
                        contains: brand.toLocaleLowerCase(),
                    }
                }),
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
            where: { id },
            data: {
                name: data.name,
                patrimonio: data.patrimonio,
                tag: data.tag,
                serie: data.serie,
                brand: data.brand?.toLocaleLowerCase(),
                description: data.description,
                next_maintenance: data.next_maintenance,
                maintenance_periodicity: data.maintenance_periodicity,
                status: data.status,

                Location: {
                    connect: { id: data.locationId },
                },
                Category: {
                    connect: { id: data.categoryId },
                },

                Certified: {
                    update: {
                        description: data.certifiedDescription,
                        needsRenovation: data.certifiedNeedsRenovation,
                        renovateInYears: data.certifiedRenovateInYears,
                    },
                },
            },
            include: {
                Certified: true,
                Location: true,
                Category: true,
            },
        })
    }

}
