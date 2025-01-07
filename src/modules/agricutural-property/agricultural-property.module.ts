import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgriculturalProperty } from './agricultural-property.entity';
import { AgriculturalPropertyService } from './agricultural-property.service';
import { AgriculturalPropertyController } from './agricultural-property.controller';
import { GrowerModule } from '../grower/grower.module';

@Module({
  imports: [TypeOrmModule.forFeature([AgriculturalProperty]), GrowerModule],
  controllers: [AgriculturalPropertyController],
  providers: [AgriculturalPropertyService],
  exports: [AgriculturalPropertyService],
})
export class AgriculturalPropertyModule {}
