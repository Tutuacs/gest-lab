import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { FilterCategoryDto } from '../dto/filter-category.dto';

@Injectable()
export class CategoryFunctionsService extends PrismaService {
    async existName(name: string) {
        return 0 < await this.category.count({
            where: {
                name: name.toLocaleLowerCase(),
            },
        });
    }

    async exist(id: number) {
        return 0 < await this.category.count({
            where: {
                id: id,
            },
        });
    }

    async canUpdate(id: number, name: string) {
        const eq = await this.category.findFirst({
            where: {
                name: name.toLocaleLowerCase(),
            },
        });

        if (eq && eq.id !== id) {
            return false;
        }

        return true;
    }

    async create(data: CreateCategoryDto) {
        return await this.category.create({
            data: {
                name: data.name.toLocaleLowerCase(),
                description: data.description?.toLocaleLowerCase(),
            },
            select: {
                id: true,
                name: true,
                description: true,
            }
        });
    }

    async delete(id: number) {
        return await this.category.delete({
            where: {
                id: id,
            },
        });
    }

    async find(id: number) {
        return await this.category.findUnique({
            where: {
                id: id,
            },
        });
    }

    async distinctBrands() {
        return await this.equipament.findMany({
            distinct: ['brand'],
            select: {
                brand: true,
                locationId: true,
            },
        });
    }

    async findBrands(id: number, locationId: number) {
        return await this.category.findUnique({
            where: {
                id: id,
            },
            select: {
                Equipament: {
                    ...(locationId != 0 && {
                        where: {
                            locationId: locationId,
                        },
                    }),
                    distinct: ['brand'],
                    select: {
                        brand: true,
                        locationId: true,
                    },
                }
            },
        });
    }


    async list({ skip, take, search }: FilterCategoryDto) {
        return await this.category.findMany({
            skip,
            take,
            where: {
                ...(search && {
                    OR: [
                        { name: { contains: search.toLocaleLowerCase() } },
                        { description: { contains: search.toLocaleLowerCase() } },
                    ]
                }),
            },
        });
    }

    async update(id: number, data: UpdateCategoryDto) {
        return await this.category.update({
            where: {
                id: id,
            },
            data: {
                name: data.name?.toLocaleLowerCase(),
                description: data.description?.toLocaleLowerCase(),
            },
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
            }
        });
    }

}
