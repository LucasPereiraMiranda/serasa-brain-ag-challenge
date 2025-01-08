import { ApiProperty } from '@nestjs/swagger';

export class DashboardLandUseResponseDto {
  @ApiProperty({
    type: Number,
    description: 'Soma da área de vegetação de todas as propriedades rurais',
    example: 150,
  })
  sumVegetationArea: number;

  @ApiProperty({
    type: Number,
    description: 'Soma da área agricultável de todas as propriedades rurais',
    example: 180,
  })
  sumArableArea: number;
}
