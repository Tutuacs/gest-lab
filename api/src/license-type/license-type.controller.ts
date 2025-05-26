import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Query } from '@nestjs/common';
import { LicenseTypeService } from './license-type.service';
import { CreateLicenseTypeDto } from './dto/create-license-type.dto';
import { UpdateLicenseTypeDto } from './dto/update-license-type.dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { ListDto } from 'src/common/list.dto';

// @UseGuards(AuthGuard, RoleGuard)
@Controller('license-type')
export class LicenseTypeController {
  constructor(private readonly licenseTypeService: LicenseTypeService) {}

  @Post()
  create(@Body() createLicenseTypeDto: CreateLicenseTypeDto) {
    return this.licenseTypeService.create(createLicenseTypeDto);
  }
  
  @HttpCode(200)
  @Get()
  findAll(@Query() query: ListDto) {
    return this.licenseTypeService.findAll(query);
  }
  
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.licenseTypeService.findOne(+id);
  }
  
  @HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLicenseTypeDto: UpdateLicenseTypeDto) {
    return this.licenseTypeService.update(+id, updateLicenseTypeDto);
  }
  
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.licenseTypeService.remove(+id);
  }
}
