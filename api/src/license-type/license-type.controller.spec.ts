import { Test, TestingModule } from '@nestjs/testing';
import { LicenseTypeController } from './license-type.controller';
import { LicenseTypeService } from './license-type.service';

describe('LicenseTypeController', () => {
  let controller: LicenseTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicenseTypeController],
      providers: [LicenseTypeService],
    }).compile();

    controller = module.get<LicenseTypeController>(LicenseTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
