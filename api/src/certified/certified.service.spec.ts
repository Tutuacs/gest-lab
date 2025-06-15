import { Test, TestingModule } from '@nestjs/testing';
import { CertifiedService } from './certified.service';

describe('CertifiedService', () => {
  let service: CertifiedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CertifiedService],
    }).compile();

    service = module.get<CertifiedService>(CertifiedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
