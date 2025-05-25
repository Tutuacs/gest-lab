import { Module } from '@nestjs/common';
import { EquipamentTypeService } from './equipament-type.service';
import { EquipamentTypeController } from './equipament-type.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EquipamentTypeFunctionsService } from './functions/equipament-type-functions.service';

@Module({
  controllers: [EquipamentTypeController],
  providers: [EquipamentTypeService, EquipamentTypeFunctionsService],
  imports: [AuthModule, PrismaModule],
})
export class EquipamentTypeModule {}
