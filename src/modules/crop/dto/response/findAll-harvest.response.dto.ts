import { ApiProperty } from '@nestjs/swagger';
import { Crop } from '../../crop.entity';

export class FindAllCropResponseDto {
  @ApiProperty({
    type: () => [Crop],
    description: 'Lista de culturas',
    isArray: true,
  })
  data: Crop[];

  @ApiProperty({
    type: Number,
    description: 'Quantidade total de culturas [considerando os filtros]',
    example: 1,
  })
  count: number;
}
