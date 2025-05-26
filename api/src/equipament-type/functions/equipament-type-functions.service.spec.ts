import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EquipamentTypeFunctionsService } from './equipament-type-functions.service';

describe('EquipamentTypeFunctionsService', () => {
  let service: EquipamentTypeFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipamentTypeFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    service = module.get<EquipamentTypeFunctionsService>(EquipamentTypeFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
