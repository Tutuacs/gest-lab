import { Test, TestingModule } from '@nestjs/testing';
import { EquipamentTypeController } from './equipament-type.controller';
import { EquipamentTypeService } from './equipament-type.service';
import { EquipamentTypeFunctionsService } from './functions/equipament-type-functions.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

describe('EquipamentTypeController', () => {
  let controller: EquipamentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipamentTypeController],
      providers: [EquipamentTypeService, EquipamentTypeFunctionsService],
        imports: [AuthModule, PrismaModule],
    }).compile();

    controller = module.get<EquipamentTypeController>(EquipamentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
