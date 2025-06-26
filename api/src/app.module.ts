import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { AppController } from './app.controller';
import { LocationModule } from './location/location.module';
import { EquipamentModule } from './equipament/equipament.module';
import { CategoryModule } from './category/category.module';
import { CertifiedModule } from './certified/certified.module';
import { EventModule } from './event/event.module';
import { EmailModule } from './email/email.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    ProfileModule,
    LocationModule,
    EquipamentModule,
    CategoryModule,
    CertifiedModule,
    EventModule,
    EmailModule,
    CacheModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
