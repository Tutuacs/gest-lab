import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateEquipamentDto } from '../dto/update-equipament.dto';
import { CreateEquipamentDto } from '../dto/create-equipament.dto';
import { CERTIFIED_STATUS } from '@prisma/client';

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

        const certifiedTypeId =  await this.category.findFirst({
            where: {
                id: data.categoryId,
            },
            select: {
                CertifiedType: {
                    select: {
                        id: true,
                    }
                }
            }
        })

        if (!certifiedTypeId || !certifiedTypeId.CertifiedType || !certifiedTypeId.CertifiedType.id) {
            throw new Error('Category not found or does not have a CertifiedType');
        }

        return await this.equipament.create({
            data: {
                name: data.name,
                brand: data.brand,
                categoryId: data.categoryId,
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
                        certifiedTypeId: certifiedTypeId.CertifiedType.id,
                        PDF: {
                            create: {
                                base64: '',
                            }
                        },
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
                _count: {
                    select: {
                        Event: true,
                    }
                },
                Location: true,
                Category: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        CertifiedType: {
                            select: {
                                id: true,
                                description: true,
                                renovateInDays: true,
                            },
                        },
                    },
                },
                Certified: {
                    select: {
                        id: true,
                        from: true,
                        to: true,
                        valid: true,
                        updatedAt: true,
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
