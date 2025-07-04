import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventFunctionsService } from './functions/event-functions.service';
import { FilterEventDto } from './dto/filter-event.dto';
import { EVENT_TYPE, ROLE } from '@prisma/client';

@Injectable()
export class EventService {

  constructor(private readonly prisma: EventFunctionsService) { }

  async create(createEventDto: CreateEventDto) {

    const validEvent = await this.prisma.dontRenovateEquipament(createEventDto.equipamentId);

    if (validEvent && createEventDto.eventType != EVENT_TYPE.VERIFICATION) {
      throw new MethodNotAllowedException('This event cannot be created because the equipment does not need renovation.');
    }

    switch (createEventDto.eventType) {
      case EVENT_TYPE.INACTIVATE_EQUIPAMENT:
        await this.prisma.prepareEquipamentInactivate(createEventDto)
        break;
      case EVENT_TYPE.ENABLE_EQUIPAMENT:
        await this.prisma.prepareEquipamentActivate(createEventDto)
        break;
      case EVENT_TYPE.CALIBRATION:
        await this.prisma.prepareCertifiedRenew(createEventDto)
        break;
      case EVENT_TYPE.MAINTENANCE_CORRECTIVE:
        await this.prisma.prepareEquipamentMaintenance(createEventDto)
        break;
      case EVENT_TYPE.MAINTENANCE_PREVENTIVE:
        await this.prisma.prepareEquipamentMaintenance(createEventDto)
      default:
    }

    return this.prisma.create(createEventDto);
  }

  async findAll(filter: FilterEventDto, profile: { role: ROLE, locationId: number }) {

    if (!filter.locationId) {
      filter.locationId = 0;
    }

    if (profile.role !== ROLE.MASTER) {
      filter.locationId = profile.locationId;
    }

    const filtered = await this.prisma.list(filter);
    const aggregate = this.agregate(filtered);

    // if (filter.categoryId || filter.eventType || filter.equipamentId || filter.search) {
    //   return {
    //     filter: filtered,
    //   }
    // }

    return {
      filter: filtered,
      aggregate: aggregate
    };

  }

  async findOne(id: number, profile: { role: ROLE, locationId: number }) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`Event with id ${id} does not exist`);
    }

    if (profile.role !== ROLE.MASTER) {
      profile.locationId = profile.locationId;
    } else {
      profile.locationId = 0;
    }

    return this.prisma.find(id, profile.locationId);
  }

  async update(id: number, updateEventDto: UpdateEventDto, profile: { role: ROLE, locationId: number }) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`Event with id ${id} does not exist`);
    }

    if (profile.role !== ROLE.MASTER) {
      const canUpdate = await this.prisma.canUpdate(id, profile.locationId);
      if (!canUpdate) {
        throw new MethodNotAllowedException(`Event with id ${id} cannot be updated`);
      }
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
