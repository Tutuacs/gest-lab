import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventTypeDto } from '../dto/create-event-type.dto';
import { UpdateEventTypeDto } from '../dto/update-event-type.dto';
import { OBJECT } from 'src/common/event-type.enums';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventTypeFunctionsService extends PrismaService {
    async existCombination(id: number, name: string) {
        return 0 < await this.eventType.count({
            where: {
                name: name,
                equipamentTypeId: id,
            },
        });
    }

    async exist(id: number) {
        return 0 < await this.eventType.count({
            where: {
                id: id,
            },
        });
    }

    async canUpdate(id: number, name: string) {
        const eq = await this.eventType.findFirst({
            where: {
                name: name,
            },
        });

        if (eq && eq.id !== id) {
            return false;
        }

        return true;
    }

    async canConnect(id: number, object: OBJECT, objectId: number) {
        let obj: any = null;

        switch (object) {
            case OBJECT.LICENSE:
                const exist = await this.licenseType.count({
                    where: {
                        id: objectId,
                    },
                });
                if (exist === 0) {
                    return false;
                }

                obj = await this.licenseType.findUnique({
                    where: {
                        id: objectId,
                    },
                });
                break;
            default:
                return false;
        }

        if (obj == null) {
            return false;
        }

        const eventType = await this.find(id);

        if (obj.equipamentTypeId != eventType!.id) {
            return false;
        }

        return true;

    }


    async create(data: CreateEventTypeDto) {
        return await this.eventType.create({
            data,
        });
    }

    async delete(id: number) {
        return await this.eventType.delete({
            where: {
                id: id,
            },
        });
    }

    async find(id: number) {
        return await this.eventType.findUnique({
            where: {
                id: id,
            },
            include: {
                ActivateLicenses: true,
                DeactivateLicenses: true,
            }
        });
    }

    async list({ skip, take }: { skip?: number, take?: number }) {
        return await this.eventType.findMany({
            skip,
            take,
        });
    }

    async connect(id: number, data: Prisma.EventTypeUpdateInput) {
        return await this.eventType.update({
            where: {
                id: id,
            },
            data,
        })
    }

    async update(id: number, data: UpdateEventTypeDto) {
        return await this.eventType.update({
            where: {
                id: id,
            },
            data: {
                name: data.name,
                description: data.description,
            }
        });
    }

}
