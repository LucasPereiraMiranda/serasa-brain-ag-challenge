import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from '../crop/crop.entity';
import { CropController } from '../crop/crop.controller';
import { CropService } from '../crop/crop.service';

@Module({
  imports: [TypeOrmModule.forFeature([Crop])],
  controllers: [CropController],
  providers: [CropService],
  exports: [CropService],
})
export class CropModule {}
