import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '../common/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['name'])
export class Crop extends BaseEntity {
  @ApiProperty({
    type: String,
    example: 'Milho',
    description: 'Nome da cultura',
  })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  // @ManyToMany(() => Harvest, (harvest) => harvest.crops)
  // @JoinTable()
  // harverts: Harvest[];
}
