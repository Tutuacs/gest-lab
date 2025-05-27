import { Test, TestingModule } from '@nestjs/testing';
import { EventTypeController } from './event-type.controller';
import { EventTypeService } from './event-type.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventTypeFunctionsService } from './functions/event-type-functions.service';

describe('EventTypeController', () => {
  let controller: EventTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventTypeController],
      providers: [EventTypeService, EventTypeFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    controller = module.get<EventTypeController>(EventTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
