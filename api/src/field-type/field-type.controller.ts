import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FieldTypeService } from './field-type.service';
import { CreateFieldTypeDto } from './dto/create-field-type.dto';
import { UpdateFieldTypeDto } from './dto/update-field-type.dto';

@Controller('field-type')
export class FieldTypeController {
  constructor(private readonly fieldTypeService: FieldTypeService) {}

  @Post()
  create(@Body() createFieldTypeDto: CreateFieldTypeDto) {
    return this.fieldTypeService.create(createFieldTypeDto);
  }

  @Get()
  findAll() {
    return this.fieldTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFieldTypeDto: UpdateFieldTypeDto) {
    return this.fieldTypeService.update(+id, updateFieldTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldTypeService.remove(+id);
  }
}
