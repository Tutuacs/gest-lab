import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard, RoleGuard } from 'src/guards';
import { Access } from 'src/decorators';
import { ROLE } from '@prisma/client';
import { ProfileAuth } from 'src/decorators/ProfileAtuh.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller()
export class AppController {

  @Access(ROLE.USER, ROLE.ADMIN, ROLE.MASTER)
  @Get(`${ROLE.USER}`)
  findAllUSER(@ProfileAuth() profile: { id: string; email: string; role: ROLE; name: string }) {
    return "User"
  }

  @Access(ROLE.ADMIN, ROLE.MASTER)
  @Get(`${ROLE.ADMIN}`)
  findAllADMIN(@ProfileAuth() profile: { id: string; email: string; role: ROLE; name: string }) {
    return "Admin"
  }

  @Access(ROLE.MASTER)
  @Get(`${ROLE.MASTER}`)
  findAllMASTER(@ProfileAuth() profile: { id: string; email: string; role: ROLE; name: string }) {
    return "Master"
  }
}
