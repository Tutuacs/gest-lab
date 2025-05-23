import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LicenseTypeService } from './license-type.service';
import { CreateLicenseTypeDto } from './dto/create-license-type.dto';
import { UpdateLicenseTypeDto } from './dto/update-license-type.dto';

@Controller('license-type')
export class LicenseTypeController {
  constructor(private readonly licenseTypeService: LicenseTypeService) {}

  @Post()
  create(@Body() createLicenseTypeDto: CreateLicenseTypeDto) {
    return this.licenseTypeService.create(createLicenseTypeDto);
  }

  @Get()
  findAll() {
    return this.licenseTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.licenseTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLicenseTypeDto: UpdateLicenseTypeDto) {
    return this.licenseTypeService.update(+id, updateLicenseTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.licenseTypeService.remove(+id);
  }
}
