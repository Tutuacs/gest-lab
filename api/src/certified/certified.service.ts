import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { CreateCertifiedDto } from './dto/create-certified.dto';
import { UpdateCertifiedDto } from './dto/update-certified.dto';
import { FilterCertifiedDto } from './dto/filter-certified.dto';
import { CertifiedFunctionsService } from './functions/certified-functions.service';

@Injectable()
export class CertifiedService {

  constructor(private readonly prisma: CertifiedFunctionsService) {}

  async findAll(filter: FilterCertifiedDto) {
    const result = await this.prisma.list(filter);

    if (result.length === 0) {
      throw new PreconditionFailedException('No certified records found with the given filters');
    }

    return result;
  }

}
