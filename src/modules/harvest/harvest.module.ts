import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Harvest } from './harvest.entity';
import { HarvestController } from './harvest.controller';
import { HarvestService } from './harvest.service';
import { AgriculturalPropertyModule } from '../agricutural-property/agricultural-property.module';
import { CropModule } from '../crop/crop.module';
import { HarvestToCrop } from '../harvest-to-crop/harvest-to-crop.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Harvest, HarvestToCrop]),
    AgriculturalPropertyModule,
    CropModule,
  ],
  controllers: [HarvestController],
  providers: [HarvestService],
})
export class HarvestModule {}
