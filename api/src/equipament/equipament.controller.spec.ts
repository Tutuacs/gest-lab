import { Test, TestingModule } from '@nestjs/testing';
import { EquipamentController } from './equipament.controller';
import { EquipamentService } from './equipament.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EquipamentFunctionsService } from './functions/equipament-functions.service';
import { AuthModule } from 'src/auth/auth.module';

describe('EquipamentController', () => {
  let controller: EquipamentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipamentController],
      providers: [EquipamentService, EquipamentFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    controller = module.get<EquipamentController>(EquipamentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
