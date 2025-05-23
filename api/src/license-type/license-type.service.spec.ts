import { Test, TestingModule } from '@nestjs/testing';
import { LicenseTypeService } from './license-type.service';

describe('LicenseTypeService', () => {
  let service: LicenseTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LicenseTypeService],
    }).compile();

    service = module.get<LicenseTypeService>(LicenseTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
