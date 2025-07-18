import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, MethodNotAllowedException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { Access } from 'src/decorators';
import { ROLE } from '@prisma/client';
import { AuthGuard, RoleGuard } from 'src/guards';
import { ProfileAuth } from 'src/decorators/ProfileAtuh.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }
  
  @Get()
  findAll(@Query() query: FilterCategoryDto) {
    return this.categoryService.findAll(query);
  }
  
  @Get('distinct/brands')
  distinctBrands(@ProfileAuth() profile: { role: ROLE, locationId: number }, @Query('locationId') locationId?: number) {
    return this.categoryService.distinctBrands(profile, locationId);
  }
  
  @Get('brands/:id')
  findBrands(@Param('id') id: string, @ProfileAuth() profile: { role: ROLE, locationId: number }, @Query('locationId') locationId?: number) {
    return this.categoryService.findBrands(+id, profile, locationId);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }
  
  @Access(ROLE.MASTER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new MethodNotAllowedException('This method is not allowed.')
    return this.categoryService.remove(+id);
  }
}
