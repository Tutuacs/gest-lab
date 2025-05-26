import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpCode } from '@nestjs/common';
import { FieldTypeService } from './field-type.service';
import { CreateFieldTypeDto } from './dto/create-field-type.dto';
import { UpdateFieldTypeDto } from './dto/update-field-type.dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { Access } from 'src/decorators';
import { ROLE } from '@prisma/client';
import { ListDto } from 'src/common/list.dto';

// @UseGuards(AuthGuard, RoleGuard)
@Controller('field-type')
export class FieldTypeController {
  constructor(private readonly fieldTypeService: FieldTypeService) {}

  // @Access(ROLE.MASTER)
  @Post()
  create(@Body() createFieldTypeDto: CreateFieldTypeDto) {
    return this.fieldTypeService.create(createFieldTypeDto);
  }

  @HttpCode(200)
  @Get()
  findAll(@Query() query: ListDto) {
    return this.fieldTypeService.findAll(query);
  }

  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldTypeService.findOne(+id);
  }
  
  // @Access(ROLE.MASTER)
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFieldTypeDto: UpdateFieldTypeDto) {
  //   return this.fieldTypeService.update(+id, updateFieldTypeDto);
  // }
    
  @HttpCode(200)
  // @Access(ROLE.MASTER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldTypeService.remove(+id);
  }
}
