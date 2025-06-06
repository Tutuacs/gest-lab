import { Test, TestingModule } from '@nestjs/testing';
import { FieldTypeService } from './field-type.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FieldTypeFunctionsService } from './functions/field-type-functions.service';
import { AuthModule } from 'src/auth/auth.module';

describe('FieldTypeService', () => {
  let service: FieldTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldTypeService, FieldTypeFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    service = module.get<FieldTypeService>(FieldTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
