import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EquipamentFunctionsService } from './equipament-functions.service';

describe('EquipamentFunctionsService', () => {
  let service: EquipamentFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipamentFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    service = module.get<EquipamentFunctionsService>(EquipamentFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
