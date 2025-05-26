import { Test, TestingModule } from '@nestjs/testing';
import { LicenseTypeFunctionsService } from './license-type-functions.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('LicenseTypeFunctionsService', () => {
  let service: LicenseTypeFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LicenseTypeFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    service = module.get<LicenseTypeFunctionsService>(LicenseTypeFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
