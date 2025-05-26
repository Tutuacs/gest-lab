import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpCode } from '@nestjs/common';
import { EquipamentTypeService } from './equipament-type.service';
import { CreateEquipamentTypeDto } from './dto/create-equipament-type.dto';
import { UpdateEquipamentTypeDto } from './dto/update-equipament-type.dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { Access } from 'src/decorators';
import { ROLE } from '@prisma/client';

// @UseGuards(AuthGuard, RoleGuard)
@Controller('equipament-type')
export class EquipamentTypeController {
  constructor(private readonly equipamentTypeService: EquipamentTypeService) {}

  // @Access(ROLE.MASTER)
  @Post()
  create(@Body() createEquipamentTypeDto: CreateEquipamentTypeDto) {
    return this.equipamentTypeService.create(createEquipamentTypeDto);
  }

  @HttpCode(200)
  @Get()
  findAll(@Query('skip') skip?: number, @Query('take') take?: number) {
    return this.equipamentTypeService.findAll({skip, take});
  }
  
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipamentTypeService.findOne(+id);
  }
  
  // @Access(ROLE.MASTER)
  @HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipamentTypeDto: UpdateEquipamentTypeDto) {
    return this.equipamentTypeService.update(+id, updateEquipamentTypeDto);
  }
  
  // @Access(ROLE.MASTER)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipamentTypeService.remove(+id);
  }
}
