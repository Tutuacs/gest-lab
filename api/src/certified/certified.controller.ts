import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CertifiedService } from './certified.service';
import { CreateCertifiedDto } from './dto/create-certified.dto';
import { UpdateCertifiedDto } from './dto/update-certified.dto';
import { FilterCertifiedDto } from './dto/filter-certified.dto';

@Controller('certified')
export class CertifiedController {
  constructor(private readonly certifiedService: CertifiedService) {}

  // @Post()
  // create(@Body() createCertifiedDto: CreateCertifiedDto) {
  //   return this.certifiedService.create(createCertifiedDto);
  // }

  @Get()
  findAll(@Query() filter: FilterCertifiedDto) {
    return this.certifiedService.findAll(filter);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.certifiedService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCertifiedDto: UpdateCertifiedDto) {
  //   return this.certifiedService.update(+id, updateCertifiedDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.certifiedService.remove(+id);
  // }
}
