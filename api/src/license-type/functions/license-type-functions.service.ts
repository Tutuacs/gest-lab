import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLicenseTypeDto } from '../dto/create-license-type.dto';
import { UpdateLicenseTypeDto } from '../dto/update-license-type.dto';

@Injectable()
export class LicenseTypeFunctionsService extends PrismaService {
    async exist(id: number) {
        return 0 < await this.licenseType.count({
            where: {
                id: id,
            },
        });
    }

    async existCombination(name: string, equipamentTypeId: number) {
        return 0 < await this.licenseType.count({
            where: {
                name: name,
                equipamentTypeId: equipamentTypeId,
            },
        });
    }

    async canUpdate(id: number, name: string, equipamentTypeId: number) {
        const licenseType = await this.licenseType.findFirst({
            where: {
                name: name,
                equipamentTypeId: equipamentTypeId,
            }
        });

        if (licenseType && licenseType.id !== id) {
            return false;
        }
        return true;
    }

    async create(data: CreateLicenseTypeDto) {
        return this.licenseType.create({
            data,
        });
    }

    async delete(id: number) {
        return this.licenseType.delete({
            where: { id },
        });
    }

    async find(id: number) {
        return this.licenseType.findUnique({
            where: { id },
        });
    }

    async list({ skip, take }: { skip?: number, take?: number }) {
        return this.licenseType.findMany({
            orderBy: [
                {
                    createdAt: 'desc',
                },
            ],
            skip,
            take,
        });
    }

    async update(id: number, data: UpdateLicenseTypeDto) {
        return this.licenseType.update({
            where: { id },
            data,
        });
    }

}
