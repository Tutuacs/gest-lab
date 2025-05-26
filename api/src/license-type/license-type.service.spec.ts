import { Test, TestingModule } from '@nestjs/testing';
import { LicenseTypeService } from './license-type.service';
import { LicenseTypeFunctionsService } from './functions/license-type-functions.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

describe('LicenseTypeService', () => {
  let service: LicenseTypeService;
  let repository: LicenseTypeFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LicenseTypeService, LicenseTypeFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    service = module.get<LicenseTypeService>(LicenseTypeService);
    repository = module.get<LicenseTypeFunctionsService>(LicenseTypeFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
