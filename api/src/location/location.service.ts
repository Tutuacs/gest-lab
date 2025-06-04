import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationFunctionsService } from './functions/location-functions.service';

@Injectable()
export class LocationService {

  constructor(private readonly prisma: LocationFunctionsService) { }

  async create(createLocationDto: CreateLocationDto) {

    const exist = await this.prisma.existCombination(
      createLocationDto.block,
      createLocationDto.room,
    );

    if (exist) {
      throw new ConflictException('Location already exists with this block and room combination');
    }

    return this.prisma.create(createLocationDto);
  }

  findAll({ skip, take }: { skip?: number; take?: number }) {
    return this.prisma.list({ skip, take });
  }

  distinctBlock() {
    return this.prisma.distinctBlock();
  }

  distinctRoom(block: string) {
    return this.prisma.distinctRoom(block);
  }

  async findOne(id: number) {

    const exist = await this.prisma.exist(id);

    if (!exist) {
      throw new NotFoundException(`Location with id ${id} does not exist`);
    }

    return this.prisma.find(id);
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const exist = await this.prisma.exist(id);

    if (!exist) {
      throw new NotFoundException(`Location with id ${id} does not exist`);
    }

    if (updateLocationDto.block && updateLocationDto.room) {
      const canUpdate = await this.prisma.canUpdate(
        id,
        updateLocationDto.block,
        updateLocationDto.room,
      );

      if (!canUpdate) {
        throw new ConflictException('Location already exists with this block and room combination');
      }
    }

    await this.prisma.update(id, updateLocationDto);
  }

  async remove(id: number) {
    const exist = await this.prisma.exist(id);

    if (!exist) {
      throw new NotFoundException(`Location with id ${id} does not exist`);
    }

    return this.prisma.delete(id);
  }
}
