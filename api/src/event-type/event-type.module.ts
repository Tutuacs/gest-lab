import { Module } from '@nestjs/common';
import { EventTypeService } from './event-type.service';
import { EventTypeController } from './event-type.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventTypeFunctionsService } from './functions/event-type-functions.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [EventTypeController],
  providers: [EventTypeService, EventTypeFunctionsService],
})
export class EventTypeModule {}
