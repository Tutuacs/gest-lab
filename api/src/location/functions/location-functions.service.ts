import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';

@Injectable()
export class LocationFunctionsService extends PrismaService {
    async exist(id: number) {
        return 0 < await this.location.count({
            where: {
                id: id,
            },
        });
    }

    async existCombination(block: string, room: string) {
        return 0 < await this.location.count({
            where: {
                block: block,
                room: room,
            },
        });
    }

    async canUpdate(id: number, block: string, room: string) {
        const Location = await this.location.findFirst({
            where: {
                block: block,
                room: room,
            }
        });

        if (Location && Location.id !== id) {
            return false;
        }
        return true;
    }

    async create(data: CreateLocationDto) {
        return this.location.create({
            data,
        });
    }

    async delete(id: number) {
        return this.location.delete({
            where: { id },
        });
    }

    async find(id: number) {
        return this.location.findUnique({
            where: { id },
        });
    }

    async list({skip, take}: {skip?: number, take?: number}) {
        return this.location.findMany({
            skip,
            take,
        });
    }

    distinctBlock() {
        return this.location.findMany({
            distinct: ['block'],
            select: {
                block: true,
            },
        });
    }

    distinctRoom(block: string) {
        return this.location.findMany({
            where: { block },
            distinct: ['room'],
            select: {
                id: true,
                room: true,
            },
        });
    }

    async update(id: number, data: UpdateLocationDto) {
        return this.location.update({
            where: { id },
            data,
        });
    }

}
