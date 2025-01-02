import { ApiProperty } from '@nestjs/swagger';
import { Grower } from '../../grower.entity';

export class FindAllGrowerResponseDto {
  @ApiProperty({
    type: () => [Grower],
    description: 'Lista de proprietários',
    isArray: true,
  })
  data: Grower[];

  @ApiProperty({
    type: Number,
    description: 'Quantidade total proprietários',
    example: 1,
  })
  count: number;
}
