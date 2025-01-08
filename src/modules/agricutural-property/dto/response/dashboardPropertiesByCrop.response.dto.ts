import { ApiProperty } from '@nestjs/swagger';

export class DashboardPropertiesByCropItemResponseDto {
  @ApiProperty({
    type: Number,
    description: 'Soma da área total em hectares associado a cultura',
    example: 1050,
  })
  sumTotalArea: number;

  @ApiProperty({
    type: String,
    description: 'Nome da cultura',
    example: 'Milho',
  })
  cropName: string;
}
