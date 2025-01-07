import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Harvest } from './harvest.entity';
import { HarvestController } from './harvest.controller';
import { HarvestService } from './harvest.service';
import { AgriculturalPropertyModule } from '../agricutural-property/agricultural-property.module';

@Module({
  imports: [TypeOrmModule.forFeature([Harvest]), AgriculturalPropertyModule],
  controllers: [HarvestController],
  providers: [HarvestService],
})
export class HarvestModule {}
