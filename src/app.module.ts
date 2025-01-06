import { Module } from '@nestjs/common';
import { ormConfig } from './orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrowerModule } from './modules/grower/grower.module';
import { AgriculturalPropertyModule } from './modules/agricutural-property/agricultural-property.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    GrowerModule,
    AgriculturalPropertyModule,
    HealthCheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
