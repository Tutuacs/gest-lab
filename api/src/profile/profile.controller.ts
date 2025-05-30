import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard, RoleGuard } from 'src/guards';
import { Access } from 'src/decorators';
import { ROLE } from '@prisma/client';
import { ProfileAuth } from 'src/decorators/ProfileAtuh.decorator';
import { ListDto } from 'src/common/list.dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  // @Access(ROLE.MASTER)
  // @Post()
  // create(@Body() createProfileDto: CreateProfileDto) {
  //   return this.profileService.create(createProfileDto);
  // }

  @Access(ROLE.MASTER, ROLE.ADMIN)
  @Get()
  findAll(@Query() query: ListDto) {
    return this.profileService.findAll(query);
  }
  
  // @Access()
  @Get(':id')
  findOne(@Param('id') id: string, @ProfileAuth() profile: { id: string, role: ROLE }) {
    return this.profileService.findOne(id, profile);
  }

  // @Access()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto, @ProfileAuth() profile: { id: string, role: ROLE }) {
    return this.profileService.update(id, updateProfileDto, profile);
  }

  // @Access()
  @Delete(':id')
  remove(@Param('id') id: string, @ProfileAuth() profile: { id: string, role: ROLE }) {
    return this.profileService.remove(id, profile);
  }
}
