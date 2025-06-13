import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryFunctionsService extends PrismaService {
    async existName(name: string) {
        return 0 < await this.category.count({
            where: {
                name: name,
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
                name: name,
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
                name: data.name,
                description: data.description,
                CertifiedType: {
                    create: {
                        description: data.certifiedType.description,
                        renovateInDays: data.certifiedType.renovateInDays,
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

    async list({ skip, take }: { skip?: number, take?: number }) {
        return await this.category.findMany({
            skip,
            take,
        });
    }

    async update(id: number, data: UpdateCategoryDto) {
        return await this.category.update({
            where: {
                id: id,
            },
            data: {
                name: data.name,
                description: data.description,
                CertifiedType: {
                    update: {
                        description: data.certifiedType!.description,
                        renovateInDays: data.certifiedType!.renovateInDays,
                    }
                }
            }
        });
    }

}
