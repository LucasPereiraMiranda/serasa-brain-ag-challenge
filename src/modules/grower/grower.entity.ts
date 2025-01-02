import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '../common/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['document'])
export class Grower extends BaseEntity {
  @ApiProperty({
    type: String,
    example: 'Lucas Miranda',
    description: 'Nome completo do proprietário',
  })
  @Column({ name: 'full_name', type: 'varchar' })
  fullName: string;

  @ApiProperty({
    type: String,
    example: '73984910002',
    description:
      'Documento do proprietário. Pode ser um CPF ou CNPJ. Observação: deve ser enviado sem máscara',
  })
  @Column({ name: 'document', type: 'varchar', length: 14 })
  document: string;
}
