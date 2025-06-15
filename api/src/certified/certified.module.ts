import { Module } from '@nestjs/common';
import { CertifiedService } from './certified.service';
import { CertifiedController } from './certified.controller';
import { CertifiedFunctionsService } from './functions/certified-functions.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [CertifiedController],
  providers: [CertifiedService, CertifiedFunctionsService],
})
export class CertifiedModule {}
