import { Test, TestingModule } from '@nestjs/testing';
import { FieldTypeController } from './field-type.controller';
import { FieldTypeService } from './field-type.service';
import { FieldTypeFunctionsService } from './functions/field-type-functions.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

describe('FieldTypeController', () => {
  let controller: FieldTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FieldTypeController],
      providers: [FieldTypeService, FieldTypeFunctionsService],
      imports: [AuthModule, PrismaModule],
    }).compile();

    controller = module.get<FieldTypeController>(FieldTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
