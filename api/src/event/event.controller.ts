import { Controller, Get, Post, Body, Patch, Param, Delete, Query, MethodNotAllowedException, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FilterEventDto } from './dto/filter-event.dto';
import { ProfileAuth } from 'src/decorators/ProfileAtuh.decorator';
import { AuthGuard, RoleGuard } from 'src/guards';
import { ROLE } from '@prisma/client';
import { Access } from 'src/decorators';

@UseGuards(AuthGuard, RoleGuard)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll(@Query() filter: FilterEventDto, @ProfileAuth() profile: { role: ROLE, locationId: number }) {
    return this.eventService.findAll(filter, profile);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ProfileAuth() profile: { role: ROLE, locationId: number }) {
    return this.eventService.findOne(+id, profile);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto, @ProfileAuth() profile: { role: ROLE, locationId: number }) {
    return this.eventService.update(+id, updateEventDto, profile);
  }

  @Access(ROLE.MASTER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new MethodNotAllowedException('This method is not allowed.')
    return this.eventService.remove(+id);
  }
}
