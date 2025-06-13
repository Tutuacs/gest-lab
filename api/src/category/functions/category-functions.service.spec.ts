import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoryFunctionsService } from './category-functions.service';

describe('CategoryFunctionsService', () => {
  let service: CategoryFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    service = module.get<CategoryFunctionsService>(CategoryFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
