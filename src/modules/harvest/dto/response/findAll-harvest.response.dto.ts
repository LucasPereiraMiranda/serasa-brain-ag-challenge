import { ApiProperty } from '@nestjs/swagger';
import { Harvest } from '../../harvest.entity';

export class FindAllHarvestResponseDto {
  @ApiProperty({
    type: () => [Harvest],
    description: 'Lista de safras',
    isArray: true,
  })
  data: Harvest[];

  @ApiProperty({
    type: Number,
    description: 'Quantidade total de safras [considerando os filtros]',
    example: 1,
  })
  count: number;
}
