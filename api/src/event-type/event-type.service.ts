import { ConflictException, Injectable, NotAcceptableException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { ConnectEventTypeDto } from './dto/connect-event-type.dto';
import { EventTypeFunctionsService } from './functions/event-type-functions.service';
import { ACTION, OBJECT, TYPE } from 'src/common/event-type.enums';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventTypeService {

  constructor(
    private readonly prisma: EventTypeFunctionsService,
  ) { }

  async create(createEventTypeDto: CreateEventTypeDto) {

    const exist = await this.prisma.existCombination(createEventTypeDto.equipamentTypeId, createEventTypeDto.name);
    if (exist) {
      throw new ConflictException(`EventType with name ${createEventTypeDto.name} already exists.`);
    }

    return await this.prisma.create(createEventTypeDto);
  }

  async connect(id: number, data: ConnectEventTypeDto) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`EventType with id ${id} does not exist.`);
    }

    const canConnect = await this.prisma.canConnect(id, data.object, data.objectId);

    if (!canConnect) {
      throw new NotAcceptableException(`EventType with id ${id} cant be connected with object ${data.object} id: ${data.objectId}.`);
    }

    let connect: { connect?: { id: number } | undefined; disconnect?: { id: number } | undefined } = {};
    let q: Prisma.EventTypeUpdateInput = {}

    if (data.action === ACTION.ADD) {
      connect = { connect: { id: data.objectId } };
    } else {
      connect = { disconnect: { id: data.objectId } };
    }

    switch (data.object) {
      case OBJECT.LICENSE:
        if (data.type === TYPE.ACTIVATE) {
          q = { DeactivateLicenses: connect }
        } else {
          q = { ActivateLicenses: connect }
        }
        break;
      default:
        throw new NotImplementedException(`Object ${data.object} is not supported for connection.`);
    }

    return this.prisma.connect(id, q);
  }

  findAll({ skip, take }: { skip?: number; take?: number }) {
    return this.prisma.list({ skip, take })
  }

  async findOne(id: number) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`EventType with id ${id} does not exist.`);
    }

    return this.prisma.find(id);
  }

  async update(id: number, updateEventTypeDto: UpdateEventTypeDto) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`EventType with id ${id} does not exist.`);
    }

    if (updateEventTypeDto.name) {
      const canUpdate = this.prisma.canUpdate(id, updateEventTypeDto.name);

      if (!canUpdate) {
        throw new ConflictException(`EventType with name ${updateEventTypeDto.name} already exists.`);
      }
    }

    return this.prisma.update(id, updateEventTypeDto);
  }

  async remove(id: number) {

    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`EventType with id ${id} does not exist.`);
    }

    return this.prisma.delete(id);
  }
}
