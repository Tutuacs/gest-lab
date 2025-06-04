import { Test, TestingModule } from '@nestjs/testing';
import { EquipamentService } from './equipament.service';
import { EquipamentFunctionsService } from './functions/equipament-functions.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('EquipamentService', () => {
  let service: EquipamentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipamentService, EquipamentFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    service = module.get<EquipamentService>(EquipamentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
