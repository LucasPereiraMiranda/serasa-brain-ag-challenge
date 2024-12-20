import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '../common/entity/base.entity';

@Entity()
@Unique(['document'])
export class Grower extends BaseEntity {
  @Column({ name: 'full_name', type: 'varchar' })
  fullName: string;

  @Column({ name: 'document', type: 'varchar', length: 14 })
  document: string;
}
