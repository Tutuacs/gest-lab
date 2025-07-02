import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ROLE } from '@prisma/client';

@Injectable()
export class ProfileService {

  constructor(private readonly prisma: PrismaService) { }

  async findAll(profile: { id: string, role: ROLE, locationId: number }) {

    if (profile.role != ROLE.MASTER) {
      if (profile.role != ROLE.ADMIN) {
        return this.prisma.profile.findFirst({
          where: {
            id: profile.id,
          },
          include: {
            Location: true,
          }
        })
      }

      if (!profile.locationId) {
        return this.prisma.profile.findFirst({
          where: {
            id: profile.id,
          },
          include: {
            Location: true,
          }
        })
      }

      return this.prisma.profile.findMany({
        where: {
          OR: [
            {
              locationId: profile.locationId,
            },
            {
              locationId: null,
            }
          ]
        },
        include: {
          Location: true,
        }
      });
    }

    return this.prisma.profile.findMany({
      include: {
        Location: true,
      }
    });
  }

  findOne(id: string, profile: { id: string, role: ROLE, locationId: number }) {

    if (profile.role != ROLE.MASTER && profile.role != ROLE.ADMIN) {
      return this.prisma.profile.findFirst({
        where: {
          id,
        },
        include: {
          Location: true,
        }
      });
    }

    if (profile.role == ROLE.ADMIN) {

      if (!profile.locationId) {
        return this.prisma.profile.findFirst({
          where: {
            id,
          }
        });
      }

      return this.prisma.profile.findFirst({
        where: {
          id,
          locationId: profile.locationId,
        },
        include: {
          Location: true,
        }
      });
    }

    return this.prisma.profile.findUnique({
      where: { id },
      include: { Location: true },
    })
  }

  async update(id: string, profile: { id: string, role: ROLE, locationId: number }, updateProfileDto: UpdateProfileDto) {

    if (profile.role != ROLE.MASTER && profile.id != id) {
      throw new UnauthorizedException(`You are not allowed to update this profile`);
    }

    if (profile.role == ROLE.ADMIN) {
      if (updateProfileDto.role == ROLE.MASTER) {
        throw new UnauthorizedException(`You are not allowed to update this profile to MASTER role`);
      }
    }

    const exist_email = await this.prisma.profile.findFirst({
      where: {
        email: updateProfileDto.email,
      }
    });

    if (exist_email && exist_email.id != id) {
      throw new ConflictException(`Email already exists`);
    }

    if (profile.role != ROLE.MASTER) {
      updateProfileDto.locationId = profile.locationId;
    }

    if (profile.role == ROLE.USER) {
      updateProfileDto.role = ROLE.USER;
    }

    return this.prisma.profile.update({
      where: {
        id,
      },
      data: updateProfileDto,
    });
  }

  remove(id: string, profile: { id: string, role: ROLE }) {
    return this.prisma.profile.delete({
      where: {
        id,
        role: {
          not: ROLE.MASTER, // Prevent deletion of MASTER profile
        }
      },
    });
  }
}
