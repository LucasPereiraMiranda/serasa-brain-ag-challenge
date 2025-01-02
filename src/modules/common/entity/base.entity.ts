import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'LOCALTIMESTAMP',
  })
  createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'LOCALTIMESTAMP',
  })
  updatedAt: string;
}
