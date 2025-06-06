import { Test, TestingModule } from '@nestjs/testing';
import { EquipamentTypeService } from './equipament-type.service';
import { EquipamentTypeFunctionsService } from './functions/equipament-type-functions.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('EquipamentTypeService', () => {
  let service: EquipamentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipamentTypeService, EquipamentTypeFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    service = module.get<EquipamentTypeService>(EquipamentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
