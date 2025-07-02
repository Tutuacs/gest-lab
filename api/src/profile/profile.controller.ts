import { Controller, Get, Body, Patch, Param, Delete, UseGuards, MethodNotAllowedException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { Access } from 'src/decorators';
import { ROLE } from '@prisma/client';
import { ProfileAuth } from 'src/decorators/ProfileAtuh.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get()
  findAll(@ProfileAuth() profile: { id: string, role: ROLE, locationId: number }) {
    return this.profileService.findAll(profile);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ProfileAuth() profile: { id: string, role: ROLE, locationId: number }) {
    return this.profileService.findOne(id, profile);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto, @ProfileAuth() profile: { id: string, role: ROLE, locationId: number }) {
    return this.profileService.update(id, profile, updateProfileDto);
  }

  @Access(ROLE.MASTER)
  @Delete(':id')
  remove(@Param('id') id: string, @ProfileAuth() profile: { id: string, role: ROLE }) {
    throw new MethodNotAllowedException('This method is not allowed.')
    return this.profileService.remove(id, profile);
  }
}
