import { Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../common/entity/base.entity';
import { Crop } from '../crop/crop.entity';
import { Harvest } from '../harvest/harvest.entity';

@Entity()
@Unique(['harvest', 'crop'])
export class HarvestToCrop extends BaseEntity {
  @ManyToOne(() => Harvest, (harvest) => harvest.harvestToCrops, {
    nullable: false,
  })
  @JoinColumn({ name: 'harvest_id' })
  harvest: Harvest;

  @ManyToOne(() => Crop, (crop) => crop.harvestToCrops, {
    nullable: false,
  })
  @JoinColumn({ name: 'crop_id' })
  crop: Crop;
}
