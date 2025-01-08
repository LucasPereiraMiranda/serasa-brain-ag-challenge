import { Column, Entity, Index, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from '../common/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { HarvestToCrop } from '../harvest-to-crop/harvest-to-crop.entity';

@Entity()
@Unique(['name'])
@Index('idx_crop_name', ['name'])
export class Crop extends BaseEntity {
  @ApiProperty({
    type: String,
    example: 'Milho',
    description: 'Nome da cultura',
  })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => HarvestToCrop, (harvestToCrop) => harvestToCrop.crop)
  public harvestToCrops: HarvestToCrop[];
}
