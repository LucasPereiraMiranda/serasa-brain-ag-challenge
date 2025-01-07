import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AgriculturalProperty } from '../agricutural-property/agricultural-property.entity';

@Entity()
export class Harvest extends BaseEntity {
  @ApiProperty({
    type: String,
    example: 'Safrinha 2021',
    description: 'Nome da Safra',
  })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ApiProperty({
    type: String,
    example: '2021',
    description: 'Ano da safra',
  })
  @Column({ type: 'varchar', length: 4 })
  year: string;

  @ManyToOne(
    () => AgriculturalProperty,
    (agriculturalProperty) => agriculturalProperty.harverts,
    {
      eager: true,
      nullable: false,
    },
  )
  @JoinColumn({ name: 'harvest_id' })
  agriculturalProperty: AgriculturalProperty;

  //   @ManyToMany(() => Crop, (crop) => crop.harverts)
  //   crops: Crop[];
}
