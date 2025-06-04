import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { EquipamentTypeModule } from './equipament-type/equipament-type.module';
import { EventTypeModule } from './event-type/event-type.module';
import { FieldTypeModule } from './field-type/field-type.module';
import { LicenseTypeModule } from './license-type/license-type.module';
import { AppController } from './app.controller';
import { LocationModule } from './location/location.module';
import { EquipamentModule } from './equipament/equipament.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    ProfileModule,
    EquipamentTypeModule,
    EventTypeModule,
    FieldTypeModule,
    LicenseTypeModule,
    LocationModule,
    EquipamentModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
