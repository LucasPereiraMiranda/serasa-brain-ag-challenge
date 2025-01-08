import { ApiProperty } from '@nestjs/swagger';

export class DashboardPropertiesByStateItemResponseDto {
  @ApiProperty({
    type: String,
    description: 'Estado',
  })
  state: string;

  @ApiProperty({
    type: Number,
    description: 'Quantidade total de propriedades rurais no estado',
    example: 1,
  })
  count: number;
}
