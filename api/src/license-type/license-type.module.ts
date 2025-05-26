import { Module } from '@nestjs/common';
import { LicenseTypeService } from './license-type.service';
import { LicenseTypeController } from './license-type.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LicenseTypeFunctionsService } from './functions/license-type-functions.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [LicenseTypeController],
  providers: [LicenseTypeService, LicenseTypeFunctionsService],
})
export class LicenseTypeModule {}
