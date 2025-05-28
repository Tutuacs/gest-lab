import { Test, TestingModule } from '@nestjs/testing';
import { LicenseTypeController } from './license-type.controller';
import { LicenseTypeService } from './license-type.service';
import { LicenseTypeFunctionsService } from './functions/license-type-functions.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

describe('LicenseTypeController', () => {
  let controller: LicenseTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicenseTypeController],
      providers: [LicenseTypeService, LicenseTypeFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    controller = module.get<LicenseTypeController>(LicenseTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
