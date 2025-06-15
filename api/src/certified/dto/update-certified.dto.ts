import { PartialType } from '@nestjs/swagger';
import { CreateCertifiedDto } from './create-certified.dto';

export class UpdateCertifiedDto extends PartialType(CreateCertifiedDto) {}
