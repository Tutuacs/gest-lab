import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CertifiedFunctionsService } from './certified-functions.service';

describe('CertifiedFunctionsService', () => {
  let service: CertifiedFunctionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CertifiedFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    service = module.get<CertifiedFunctionsService>(CertifiedFunctionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
