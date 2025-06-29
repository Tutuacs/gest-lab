import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpCode } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ListDto } from 'src/common/list.dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { Access } from 'src/decorators';
import { ROLE } from '@prisma/client';

@UseGuards(AuthGuard, RoleGuard)
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Access(ROLE.MASTER)
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }
  
  @HttpCode(200)
  @Get()
  findAll(@Query() query: ListDto) {
    return this.locationService.findAll(query);
  }
  
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }
  
  @HttpCode(200)
  @Get('distinct/block/')
  distinctBlock() {
    return this.locationService.distinctBlock();
  }
  
  @HttpCode(200)
  @Get('distinct/room/:block')
  distinctRoom(@Param('block') block: string) {
    return this.locationService.distinctRoom(block);
  }
  
  @HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(+id, updateLocationDto);
  }
  
  @Access(ROLE.MASTER)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }
}
