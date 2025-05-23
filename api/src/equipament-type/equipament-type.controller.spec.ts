import { Test, TestingModule } from '@nestjs/testing';
import { EquipamentTypeController } from './equipament-type.controller';
import { EquipamentTypeService } from './equipament-type.service';

describe('EquipamentTypeController', () => {
  let controller: EquipamentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipamentTypeController],
      providers: [EquipamentTypeService],
    }).compile();

    controller = module.get<EquipamentTypeController>(EquipamentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
