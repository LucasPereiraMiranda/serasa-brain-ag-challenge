import { Module } from '@nestjs/common';
import { ormConfig } from './orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrowerModule } from './modules/grower/grower.module';
import { AgriculturalPropertyModule } from './modules/agricutural-property/agricultural-property.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    GrowerModule,
    AgriculturalPropertyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
