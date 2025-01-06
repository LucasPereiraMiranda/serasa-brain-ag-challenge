import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from '../common/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AgriculturalProperty } from '../agricutural-property/agricultural-property.entity';

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

  @OneToMany(
    () => AgriculturalProperty,
    (agriculturalProperty) => agriculturalProperty.grower,
  )
  agriculturalProperty: AgriculturalProperty[];
}
