import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, MethodNotAllowedException } from '@nestjs/common';
import { EquipamentService } from './equipament.service';
import { CreateEquipamentDto } from './dto/create-equipament.dto';
import { UpdateEquipamentDto } from './dto/update-equipament.dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { Access } from 'src/decorators';
import { ROLE } from '@prisma/client';
import { FilterEquipamentDto } from './dto/filter-equipament.dto';
import { ProfileAuth } from 'src/decorators/ProfileAtuh.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('equipament')
export class EquipamentController {
  constructor(private readonly equipamentService: EquipamentService) { }

  @Post()
  create(@Body() createEquipamentDto: CreateEquipamentDto) {
    return this.equipamentService.create(createEquipamentDto);
  }

  @Get()
  findAll(@Query() query: FilterEquipamentDto, @ProfileAuth() profile: { role: ROLE, locationId: number }) {
    return this.equipamentService.findAll(query, profile);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipamentService.findOne(+id);
  }

  @Get('consult/pendents')
  pendents(@ProfileAuth() profile: { role: ROLE, locationId: number, periodicity: number }, @Query('locationId') locationId?: number) {
    return this.equipamentService.pendents(profile, locationId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipamentDto: UpdateEquipamentDto) {
    return this.equipamentService.update(+id, updateEquipamentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new MethodNotAllowedException('This method is not allowed.')
    return this.equipamentService.remove(+id);
  }
}
