import { Module } from '@nestjs/common';
import { EquipamentTypeService } from './equipament-type.service';
import { EquipamentTypeController } from './equipament-type.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EquipamentTypeController],
  providers: [EquipamentTypeService],
  imports: [AuthModule],
})
export class EquipamentTypeModule {}
