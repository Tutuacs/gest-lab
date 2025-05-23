import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EquipamentTypeService } from './equipament-type.service';
import { CreateEquipamentTypeDto } from './dto/create-equipament-type.dto';
import { UpdateEquipamentTypeDto } from './dto/update-equipament-type.dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { Access } from 'src/decorators';
import { ROLE } from '@prisma/client';
import { ProfileAuth } from 'src/decorators/ProfileAtuh.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('equipament-type')
export class EquipamentTypeController {
  constructor(private readonly equipamentTypeService: EquipamentTypeService) {}

  @Post()
  create(@Body() createEquipamentTypeDto: CreateEquipamentTypeDto) {
    return this.equipamentTypeService.create(createEquipamentTypeDto);
  }
  

  @Get()
  findAll(@ProfileAuth() profile: { id: string; email: string; role: ROLE; name: string }) {
    console.log('findAll');
    console.log(profile);
    return this.equipamentTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipamentTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipamentTypeDto: UpdateEquipamentTypeDto) {
    return this.equipamentTypeService.update(+id, updateEquipamentTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipamentTypeService.remove(+id);
  }
}
