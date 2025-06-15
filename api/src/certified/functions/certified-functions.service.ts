import {
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CERTIFIED_STATUS } from '@prisma/client';
import { FilterCertifiedDto } from '../dto/filter-certified.dto';

@Injectable()
export class CertifiedFunctionsService extends PrismaService {

    list({ skip, take, brand, updatedAtFrom, updatedAtTo, updateUntil, status }: FilterCertifiedDto) {
        return this.certified.findMany({
            skip,
            take,
            where: {
                ...(brand && { brand }),
                ...(updatedAtFrom && { updatedAt: { gte: updatedAtFrom } }),
                ...(updatedAtTo && { updatedAt: { lte: updatedAtTo } }),
                ...(updateUntil && {
                    OR: [
                        { to: { lte: updateUntil } },
                        { valid: CERTIFIED_STATUS.EXPIRED }
                    ]
                }),
                ...(status && { valid: status }),
            },
            include: {
                CertifiedType: true,
                Equipament: {
                    select: {
                        id: true,
                    }
                }
            },
            orderBy: [
                { updatedAt: 'desc' },
                { to: 'asc' }
            ]
        });
    }

}
