import { Test, TestingModule } from '@nestjs/testing';
import { EquipamentTypeService } from './equipament-type.service';

describe('EquipamentTypeService', () => {
  let service: EquipamentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipamentTypeService],
    }).compile();

    service = module.get<EquipamentTypeService>(EquipamentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
