import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateEventDto } from '../dto/update-event.dto';
import { CreateEventDto } from '../dto/create-event.dto';
import { FilterEventDto } from '../dto/filter-event.dto';
import { CERTIFIED_STATUS, EQUIPAMENT_STATUS } from '@prisma/client';

@Injectable()
export class EventFunctionsService extends PrismaService {

    async exist(id: number) {
        return 0 < await this.event.count({
            where: {
                id: id,
            },
        });
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
                Certified: {
                    include: {
                        CertifiedType: true,
                    }
                }
            }
        });

        const renew = equipament!.Certified!.CertifiedType.renovateInDays;

        const to_date = new Date();
        to_date.setDate(to_date.getDate() + renew);

        return this.certified.update({
            where: {
                equipamentId: data.equipamentId,
            },
            data: {
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
        return this.equipament.update({
            where: {
                id: data.equipamentId,
            },
            data: {
                status: EQUIPAMENT_STATUS.MAINTENANCE,
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

    async prepareRenewCertified(data: CreateEventDto) {
        return this.certified.update({
            where: {
                equipamentId: data.equipamentId,
            },
            data: {
                PDF: {
                    update: {
                        base64: data.certified,
                    }
                }
            }
        })
    }

    create(data: CreateEventDto) {
        return this.event.create({
            data: {
                name: data.name.toLocaleLowerCase(),
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

    async find(id: number) {
        return await this.event.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                description: true,
                from: true,
                to: true,
                eventType: true,
                value: true,
                Equipament: true,
            }
        });
    }

    async list({ skip, take, equipamentId, categoryId, startDate, endDate, eventType, search, orderValue }: FilterEventDto) {
        return await this.event.findMany({
            skip,
            take,
            where: {
                ...(equipamentId && { equipamentId }),
                ...(categoryId && { Equipament: { categoryId } }),
                ...(startDate && { from: { gte: startDate } }),
                ...(endDate && { to: { lte: endDate } }),
                ...(eventType && { eventType }),
                ...(search && {
                    OR: [
                        { name: { contains: search.toLocaleLowerCase() } },
                        { description: { contains: search.toLocaleLowerCase() } },
                    ]
                }),
            },
            orderBy: [
                {
                    createdAt: 'desc',
                },
                ...(orderValue ? [{ value: orderValue }] : []),
            ]
        });
    }

    async update(id: number, data: UpdateEventDto) {
        return await this.event.update({
            where: {
                id: id,
            },
            data: {
                name: data.name,
                description: data.description,
                from: data.from,
                to: data.to,
                value: data.value,
            }
        });
    }

}
