import { Test, TestingModule } from '@nestjs/testing';
import { EventTypeService } from './event-type.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { EventTypeFunctionsService } from './functions/event-type-functions.service';

describe('EventTypeService', () => {
  let service: EventTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventTypeService, EventTypeFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    service = module.get<EventTypeService>(EventTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
