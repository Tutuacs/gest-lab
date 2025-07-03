import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateEventDto } from '../dto/update-event.dto';
import { CreateEventDto } from '../dto/create-event.dto';
import { FilterEventDto } from '../dto/filter-event.dto';
import { CERTIFIED_STATUS, EQUIPAMENT_STATUS, EVENT_TYPE } from '@prisma/client';

@Injectable()
export class EventFunctionsService extends PrismaService {

    async exist(id: number) {
        return 0 < await this.event.count({
            where: {
                id: id,
            },
        });
    }

    async canUpdate(id: number, locationId: number) {
        return 0 < await this.event.count({
            where: {
                id: id,
                Equipament: {
                    locationId: locationId,
                },
            },
        });
    }

    async dontRenovateEquipament(equipamentId: number) {
        return this.equipament.count({
            where: {
                id: equipamentId,
                Certified: {
                    needsRenovation: false,
                }
            }
        })
    }

    async prepareEquipamentInactivate(data: CreateEventDto) {
        return this.equipament.update({
            where: {
                id: data.equipamentId,
            },
            data: {
                status: EQUIPAMENT_STATUS.INACTIVE
            }
        })
    }

    async prepareEquipamentActivate(data: CreateEventDto) {
        return this.equipament.update({
            where: {
                id: data.equipamentId,
            },
            data: {
                status: EQUIPAMENT_STATUS.ACTIVE
            }
        })
    }

    async prepareCertifiedRenew(data: CreateEventDto) {

        const equipament = await this.equipament.findFirst({
            where: {
                id: data.equipamentId,
            },
            include: {
                Certified: true
            }
        });

        const renew = equipament!.Certified!.renovateInYears * 365; // Convert years to days

        const to_date = new Date();
        to_date.setDate(to_date.getDate() + renew);
        if (!equipament!.Certified!.needsRenovation) {
            to_date.setFullYear(to_date.getFullYear() + 100);
        }

        return this.certified.update({
            where: {
                equipamentId: data.equipamentId,
            },
            data: {
                Equipament: {
                    update: {
                        status: EQUIPAMENT_STATUS.ACTIVE,
                    }
                },
                valid: CERTIFIED_STATUS.ACTIVE,
                from: new Date(),
                to: to_date,
                updatedAt: new Date(),
            }
        })
    }

    async prepareCertifiedDesable(data: CreateEventDto) {
        return this.certified.update({
            where: {
                equipamentId: data.equipamentId,
            },
            data: {
                valid: CERTIFIED_STATUS.EXPIRED,
                to: new Date(),
                updatedAt: new Date(),
            }
        })
    }

    async prepareEquipamentMaintenance(data: CreateEventDto) {
        // TODO: next_maintenance should be data.to
        const next_maintenance = new Date(data.to);

        const equipament = await this.equipament.findFirst({
            where: {
                id: data.equipamentId,
            },
            select: {
                maintenance_periodicity: true,
            }
        });

        if (equipament) {
            next_maintenance.setDate(next_maintenance.getDate() + equipament.maintenance_periodicity);
        }

        return this.equipament.update({
            where: {
                id: data.equipamentId,
            },
            data: {
                status: EQUIPAMENT_STATUS.MAINTENANCE,
                next_maintenance: next_maintenance,
                Certified: {
                    update: {
                        valid: CERTIFIED_STATUS.EXPIRED,
                        to: new Date(),
                        updatedAt: new Date(),
                    }
                }
            }
        })
    }

    create(data: CreateEventDto) {
        return this.event.create({
            data: {
                description: data.description.toLocaleLowerCase(),
                from: data.from,
                to: data.to,
                eventType: data.eventType,
                value: data.value,
                equipamentId: data.equipamentId,
            }
        });
    }

    async delete(id: number) {
        return await this.event.delete({
            where: {
                id: id,
            },
        });
    }

    async find(id: number, locationId: number) {
        return await this.event.findUnique({
            where: {
                id: id,
                ...(locationId !== 0 && { Equipament: { locationId: locationId } })
            },
            select: {
                id: true,
                description: true,
                from: true,
                to: true,
                eventType: true,
                value: true,
                Equipament: true,
            }
        });
    }

    async list({ skip, take, equipamentId, categoryId, locationId, startDate, endDate, eventType, search, orderValue }: FilterEventDto) {
        return await this.event.findMany({
            skip,
            take,
            where: {
                ...(equipamentId && { equipamentId }),
                ...(categoryId && { Equipament: { categoryId } }),
                ...(locationId !== 0 && { Equipament: { locationId } }),
                ...(startDate && { from: { gte: new Date(startDate) } }),
                ...(endDate && { to: { lte: new Date(endDate) } }),
                ...(eventType && { eventType }),
                ...(search && {
                    OR: [
                        { description: { contains: search.toLocaleLowerCase() } },
                    ]
                }),
            },
            orderBy: orderValue
                ? [{ value: orderValue }]
                : [{ createdAt: 'desc' }],
        });
    }

    async update(id: number, data: UpdateEventDto) {
        return await this.event.update({
            where: {
                id: id,
            },
            data: {
                description: data.description,
                from: data.from,
                to: data.to,
                value: data.value,
            }
        });
    }

}
