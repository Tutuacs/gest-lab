import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventFunctionsService } from './functions/event-functions.service';
import { FilterEventDto } from './dto/filter-event.dto';
import { EVENT_TYPE } from '@prisma/client';

@Injectable()
export class EventService {

  constructor(private readonly prisma: EventFunctionsService) { }

  async create(createEventDto: CreateEventDto) {

    switch (createEventDto.eventType) {
      case EVENT_TYPE.INACTIVATE_EQUIPAMENT:
        this.prisma.prepareEquipamentInactivate(createEventDto)
        break;
      case EVENT_TYPE.ENABLE_EQUIPAMENT:
        this.prisma.prepareEquipamentActivate(createEventDto)
        break;
      case EVENT_TYPE.DISABLE_CERTIFIED:
        this.prisma.prepareCertifiedDesable(createEventDto)
        break;
      case EVENT_TYPE.MAINTENANCE:
        this.prisma.prepareEquipamentMaintenance(createEventDto)
        break;
      default:
        console.log(`Event Type not implemented: ${createEventDto.eventType}`)
    }

    // TODO: Execute the changes before creating the event based on type

    return this.prisma.create(createEventDto);
  }

  async findAll(filter: FilterEventDto) {
    const filtered = await this.prisma.list(filter);

    const aggregate = this.agregate(filtered);

    return {
      filter: filtered,
      aggregate: aggregate
    };

  }

  async findOne(id: number) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`Event with id ${id} does not exist`);
    }

    return this.prisma.find(id);
  }

  async update(id: number, updateEventDto: UpdateEventDto) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`Event with id ${id} does not exist`);
    }

    return this.prisma.update(id, updateEventDto);
  }

  async remove(id: number) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`Event with id ${id} does not exist`);
    }

    return this.prisma.delete(id);
  }

  agregate(filtered: {
    id: number;
    name: string;
    description: string;
    from: Date;
    to: Date;
    eventType: EVENT_TYPE;
    value: number;
    createdAt: Date;
    equipamentId: number;
  }[]) {

    // create map
    const types_map = new Map();
    const value_map = new Map();

    for (const event of filtered) {
      const t = types_map.get(event.eventType);
      const v = value_map.get(event.eventType);

      if (!t) {
        types_map.set(event.eventType, 1);
      }

      if (!v) {
        value_map.set(event.eventType, event.value);
        continue;
      }

      types_map.set(event.eventType, t + 1);
      value_map.set(event.eventType, v + event.value);
    }

    const aggregate: { type: string, count: number, value: number }[] = [];

    for (const [key, value] of types_map.entries()) {
      aggregate.push({
        type: key,
        count: value,
        value: value_map.get(key) || 0
      });
    }

    return aggregate;

  }

}
