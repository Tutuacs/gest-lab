import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryFunctionsService } from './functions/category-functions.service';
import { FilterCategoryDto } from './dto/filter-category.dto';

@Injectable()
export class CategoryService {

  constructor(private readonly prisma: CategoryFunctionsService) { }

  async create(createCategoryDto: CreateCategoryDto) {

    if (!createCategoryDto.certifiedType || !createCategoryDto.certifiedType.renovateInDays) {
      throw new BadRequestException('Certified type and renovateInDays are required');
    }
    // parse the renovateInDays(years) to days
    createCategoryDto.certifiedType.renovateInDays = createCategoryDto.certifiedType.renovateInDays * 365;
    let categoryBrands = "";

    for (const brand of createCategoryDto.brands.split(",")) {
      if (brand && brand.trim() !== "") {
        categoryBrands += brand + ", ";
      }
    }

    createCategoryDto.brands = categoryBrands

    const exist = await this.prisma.existName(createCategoryDto.name);
    if (exist) {
      throw new ConflictException(`Category with name ${createCategoryDto.name} already exists`);
    }

    return this.prisma.create(createCategoryDto);
  }

  findAll(filter: FilterCategoryDto) {
    return this.prisma.list(filter);
  }

  async findOne(id: number) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`Category with id ${id} does not exist`);
    }

    return this.prisma.find(id);
  }

  async distinctBrands() {
    return this.prisma.distinctBrands();
  }

  async findBrands(id: number) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`Category with id ${id} does not exist`);
    }

    return this.prisma.findBrands(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`Category with id ${id} does not exist`);
    }

    if (updateCategoryDto.certifiedType && updateCategoryDto.certifiedType.renovateInDays) {
      // parse the renovateInDays(years) to days
      updateCategoryDto.certifiedType.renovateInDays = updateCategoryDto.certifiedType.renovateInDays * 365;
    }

    if (updateCategoryDto.name) {
      const exist = await this.prisma.existName(updateCategoryDto.name);
      if (exist) {
        throw new ConflictException(`Category with name ${updateCategoryDto.name} already exists`);
      }
    }

    return this.prisma.update(id, updateCategoryDto);
  }

  async remove(id: number) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`Category with id ${id} does not exist`);
    }

    return this.prisma.delete(id);
  }
}
