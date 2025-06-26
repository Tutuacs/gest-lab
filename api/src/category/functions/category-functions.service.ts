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
                brands: data.brands,
                CertifiedType: {
                    create: {
                        description: data.certifiedType.description,
                        renovateInDays: data.certifiedType.renovateInDays,
                    }
                }
            },
            select: {
                id: true,
                name: true,
                description: true,
                brands: true,
                CertifiedType: {
                    select: {
                        id: true,
                        description: true,
                        renovateInDays: true,
                    }
                }
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
            include: {
                CertifiedType: true,
            }
        });
    }

    async distinctBrands() {
        return await this.category.findMany({
            distinct: ['brands'],
            select: {
                brands: true,
            },
        });
    }

    async findBrands(id: number) {
        return await this.category.findUnique({
            where: {
                id: id,
            },
            select: {
                brands: true,
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
                brands: data.brands,
                CertifiedType: {
                    update: {
                        description: data.certifiedType?.description,
                        renovateInDays: data.certifiedType?.renovateInDays,
                    }
                }
            },
            select: {
                id: true,
                name: true,
                description: true,
                brands: true,
                createdAt: true,
                CertifiedType: {
                    select: {
                        id: true,
                        description: true,
                        renovateInDays: true,
                        createdAt: true,
                    }
                },
            }
        });
    }

}
