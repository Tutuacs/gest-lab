import { ConflictException, Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ROLE } from '@prisma/client';
import { ProfileFunctionsService } from './functions/profile-functions.service';

@Injectable()
export class ProfileService {

  constructor(private readonly prisma: ProfileFunctionsService) { }

  // create(createProfileDto: CreateProfileDto) {
  //   return 'This action adds a new profile';
  // }

  findAll({ skip, take }: { skip?: number, take?: number }) {
    return this.prisma.list({ skip, take });
  }

  async findOne(id: string, profile: { id: string, role: ROLE }) {
    const exist = await this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`Profile with id ${id} does not exist`);
    }

    if (profile.role === ROLE.USER) {
      return this.prisma.find(profile.id);
    }

    return this.prisma.find(id);
  }

  async update(id: string, updateProfileDto: UpdateProfileDto, profile: { id: string, role: ROLE }) {
    const exist = this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`Profile with id ${id} does not exist`);
    }
    return `This action updates a #${id} profile`;
  }

  async remove(id: string, profile: { id: string, role: ROLE }) {
    const exist = this.prisma.exist(id);
    if (!exist) {
      throw new NotFoundException(`Profile with id ${id} does not exist`);
    }

    if (profile.role !== ROLE.MASTER) {
      throw new MethodNotAllowedException(`Only MASTER can delete profiles`);
    }

    const profileToDelete = await this.prisma.find(id);

    if (profileToDelete!.role === ROLE.MASTER && profile.id !== profileToDelete!.id) {
      throw new MethodNotAllowedException(`You cannot delete this MASTER profile`);
    }

    await this.prisma.delete(id);
  }
}
