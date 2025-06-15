import { Test, TestingModule } from '@nestjs/testing';
import { CertifiedController } from './certified.controller';
import { CertifiedService } from './certified.service';

describe('CertifiedController', () => {
  let controller: CertifiedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertifiedController],
      providers: [CertifiedService],
    }).compile();

    controller = module.get<CertifiedController>(CertifiedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
