import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Grower } from '../grower/grower.entity';

@Entity()
export class AgriculturalProperty extends BaseEntity {
  @ApiProperty({
    type: String,
    example: 'Fazenda Aroeira',
    description: 'Nome da propriedade agrícola',
  })
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({
    type: String,
    example: 'Felixlândia',
    description: 'Nome da cidade em que a propriedade está contida',
  })
  @Column({ type: 'varchar', length: 100 })
  city: string;

  @ApiProperty({
    type: String,
    example: 'MG',
    description: 'Sigla do estado em que a propriedade agrícola está contida.',
  })
  @Column({ type: 'varchar', length: 2 })
  state: string;

  @ApiProperty({
    type: Number,
    example: '150.000',
    description: 'Area total da propriedade agrícola',
  })
  @Column({ name: 'total_area', type: 'decimal', precision: 10, scale: 3 })
  totalArea: number;

  @ApiProperty({
    type: Number,
    example: '110.000',
    description: 'Area arável na propriedade agrícola',
  })
  @Column({ name: 'arable_area', type: 'decimal', precision: 10, scale: 3 })
  arableArea: number;

  @ApiProperty({
    type: Number,
    example: '40.000',
    description: 'Area de preservação não arável na propriedade agrícola',
  })
  @Column({ name: 'vegetation_area', type: 'decimal', precision: 10, scale: 3 })
  vegetationArea: number;

  @ManyToOne(() => Grower, (grower) => grower.agriculturalProperty, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'grower_id' })
  grower: Grower;
}
