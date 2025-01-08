import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AgriculturalProperty } from '../agricutural-property/agricultural-property.entity';
import { HarvestToCrop } from '../harvest-to-crop/harvest-to-crop.entity';
import { Exclude } from 'class-transformer';

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
      nullable: false,
    },
  )
  @JoinColumn({ name: 'harvest_id' })
  @Exclude()
  agriculturalProperty: AgriculturalProperty;

  @ApiProperty({
    type: [HarvestToCrop],
    example: [
      {
        id: '265b6023-6b58-4786-a44c-206875fa10de',
        createdAt: '2025-01-08T14:21:51.006Z',
        updatedAt: '2025-01-08T14:21:51.006Z',
        crop: {
          id: 'a8a9a870-b9f7-4a14-bcb6-8bfa1461e029',
          createdAt: '2025-01-08T14:20:42.803Z',
          updatedAt: '2025-01-08T14:20:42.803Z',
          name: 'Algodão',
        },
      },
    ],
    description: 'Associação entre safra e culturas',
    isArray: true,
  })
  @OneToMany(() => HarvestToCrop, (harvestToCrop) => harvestToCrop.harvest)
  harvestToCrops: HarvestToCrop[];
}
