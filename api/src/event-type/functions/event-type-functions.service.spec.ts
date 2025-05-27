import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventTypeFunctionsService } from './event-type-functions.service';

describe('EventTypeFunctionsService', () => {
  let service: EventTypeFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventTypeFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    service = module.get<EventTypeFunctionsService>(EventTypeFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
