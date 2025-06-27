import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryFunctionsService } from './functions/category-functions.service';
import { FilterCategoryDto } from './dto/filter-category.dto';

@Injectable()
export class CategoryService {

  constructor(private readonly prisma: CategoryFunctionsService) { }

  async create(createCategoryDto: CreateCategoryDto) {
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
    const result = await this.prisma.distinctBrands();

    // brands map
    const brandsMap: Map<string, boolean> = new Map();

    result.forEach((item) => {
      // TODO by locationId
      brandsMap.set(item.brand, true);
    })

    return {
      brands: Array.from(brandsMap.keys()),
    }

  }

  async findBrands(id: number) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`Category with id ${id} does not exist`);
    }

    // TODO by locationId
    const locationId = 1
    return this.prisma.findBrands(id, locationId);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`Category with id ${id} does not exist`);
    }

    if (updateCategoryDto.name) {
      const canUpdate = await this.prisma.canUpdate(id, updateCategoryDto.name);
      if (!canUpdate) {
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
