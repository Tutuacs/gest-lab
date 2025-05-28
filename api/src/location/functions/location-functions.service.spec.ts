import { Test, TestingModule } from '@nestjs/testing';
import { LocationFunctionsService } from './location-functions.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('LocationFunctionsService', () => {
  let service: LocationFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    service = module.get<LocationFunctionsService>(LocationFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
