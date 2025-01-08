import { ApiProperty } from '@nestjs/swagger';

export class DashboardTotalPropertiesResponseDto {
  @ApiProperty({
    type: Number,
    description:
      'Area total em hectares somada de todas as propriedades rurais',
    example: 150,
  })
  sumTotalArea: number;

  @ApiProperty({
    type: Number,
    description: 'Quantidade total de propriedades rurais no estado',
    example: 1,
  })
  count: number;
}
