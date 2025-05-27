import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpCode } from '@nestjs/common';
import { EventTypeService } from './event-type.service';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { ConnectEventTypeDto } from './dto/connect-event-type.dto';
import { ListDto } from 'src/common/list.dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { Access } from 'src/decorators';
import { ROLE } from '@prisma/client';

// @UseGuards(AuthGuard, RoleGuard)
@Controller('event-type')
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  // @Access(ROLE.MASTER)
  @Post()
  create(@Body() createEventTypeDto: CreateEventTypeDto) {
    return this.eventTypeService.create(createEventTypeDto);
  }
  
  @HttpCode(200)
  // @Access(ROLE.MASTER)
  @Post(":id")
  connect(@Body() connectEventTypeDto: ConnectEventTypeDto, @Param('id') id: number) {
    return this.eventTypeService.connect(+id, connectEventTypeDto);
  }
  
  @HttpCode(200)
  @Get()
  findAll(@Query() query: ListDto) {
    return this.eventTypeService.findAll(query);
  }
  
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventTypeService.findOne(+id);
  }
  
  @HttpCode(200)
  // @Access(ROLE.MASTER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventTypeDto: UpdateEventTypeDto) {
    return this.eventTypeService.update(+id, updateEventTypeDto);
  }
  
  @HttpCode(200)
  // @Access(ROLE.MASTER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventTypeService.remove(+id);
  }
}
