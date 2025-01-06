import { ApiProperty } from '@nestjs/swagger';
import { AgriculturalProperty } from '../../agricultural-property.entity';

export class FindAllAgriculturalPropertyResponseDto {
  @ApiProperty({
    type: () => [AgriculturalProperty],
    description: 'Lista de propriedades rurais',
    isArray: true,
  })
  data: AgriculturalProperty[];

  @ApiProperty({
    type: Number,
    description:
      'Quantidade total de propriedades rurais [considerando os filtros]',
    example: 1,
  })
  count: number;
}
