import { Module } from '@nestjs/common';
import { EquipamentService } from './equipament.service';
import { EquipamentController } from './equipament.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EquipamentFunctionsService } from './functions/equipament-functions.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [EquipamentController],
  providers: [EquipamentService, EquipamentFunctionsService],
})
export class EquipamentModule {}
