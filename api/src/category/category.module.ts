import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryFunctionsService } from './functions/category-functions.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryFunctionsService],
})
export class CategoryModule {}
