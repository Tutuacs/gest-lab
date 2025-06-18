import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventFunctionsService } from './event-functions.service';

describe('EventFunctionsService', () => {
  let service: EventFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    service = module.get<EventFunctionsService>(EventFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
