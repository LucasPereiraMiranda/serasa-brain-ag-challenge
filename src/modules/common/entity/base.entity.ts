import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({
    type: String,
    example: '7c32a0b4-e8bb-476b-bf25-52deebeb0189',
    description: 'Id único do registro',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ApiProperty({
    type: Date,
    example: '2024-12-20T14:06:12.515Z',
    description: 'Data de criação do registro',
  })
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'LOCALTIMESTAMP',
  })
  createdAt: string;

  @ApiProperty({
    type: Date,
    example: '2024-12-20T14:06:12.515Z',
    description: 'Data de atualização do registro',
  })
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'LOCALTIMESTAMP',
  })
  updatedAt: string;
}
