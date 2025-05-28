import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { LocationFunctionsService } from './functions/location-functions.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

describe('LocationController', () => {
  let controller: LocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, PrismaModule],
      controllers: [LocationController],
      providers: [LocationService, LocationFunctionsService],
    }).compile();

    controller = module.get<LocationController>(LocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
