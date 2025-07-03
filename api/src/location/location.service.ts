import { ConflictException, ForbiddenException, Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationFunctionsService } from './functions/location-functions.service';
import { ROLE } from '@prisma/client';

@Injectable()
export class LocationService {

  constructor(private readonly prisma: LocationFunctionsService) { }

  async create(createLocationDto: CreateLocationDto) {
    const [exist, existRamal, existName] = await Promise.all([
      this.prisma.existCombination(createLocationDto.block, createLocationDto.room),
      this.prisma.existRamal(createLocationDto.ramal),
      this.prisma.existName(createLocationDto.name),
    ]);

    if (exist) {
      throw new ConflictException('Location already exists with this block and room combination');
    }

    if (existName) {
      throw new ConflictException('Location already exists with this name');
    }

    if (existRamal) {
      throw new ConflictException('Location already exists with this ramal');
    }

    return this.prisma.create(createLocationDto);
  }

  async findAll({ skip, take }: { skip?: number; take?: number }, profile: { role: ROLE, locationId: number }) {
    if (profile.role !== ROLE.MASTER) {
      if (!profile.locationId) {
        throw new PreconditionFailedException('Profile does not have a location associated');
      }

      return [ await this.prisma.find(profile.locationId) ]
    }

    return this.prisma.list({ skip, take });
  }

  distinctBlock() {
    return this.prisma.distinctBlock();
  }

  async distinctRoom(block: string) {
    const response = await this.prisma.distinctRoom(block);

    if (response.length === 0) {
      throw new NotFoundException(`This block ${block} does not exist`);
    }

    return response;
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
        updateLocationDto.block!,
        updateLocationDto.room!,
        updateLocationDto.ramal!,
        updateLocationDto.name!,
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
