import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { FieldTypeFunctionsService } from './field-type-functions.service';

describe('FieldTypeFunctionsService', () => {
  let service: FieldTypeFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldTypeFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    service = module.get<FieldTypeFunctionsService>(FieldTypeFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
