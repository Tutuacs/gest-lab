import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { LocationFunctionsService } from './functions/location-functions.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, PrismaModule],
      providers: [LocationService, LocationFunctionsService],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
