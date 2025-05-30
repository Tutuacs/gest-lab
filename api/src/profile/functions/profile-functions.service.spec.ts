import { Test, TestingModule } from '@nestjs/testing';
import { ProfileFunctionsService } from './profile-functions.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

describe('ProfileFunctionsService', () => {
  let service: ProfileFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    service = module.get<ProfileFunctionsService>(ProfileFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
