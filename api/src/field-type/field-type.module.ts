import { Module } from '@nestjs/common';
import { FieldTypeService } from './field-type.service';
import { FieldTypeController } from './field-type.controller';
import { FieldTypeFunctionsService } from './functions/field-type-functions.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [FieldTypeController],
  providers: [FieldTypeService, FieldTypeFunctionsService],
})
export class FieldTypeModule {}
