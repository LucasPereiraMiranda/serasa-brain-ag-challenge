import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneByIdHarvestRequestDto {
  @ApiProperty({ name: 'id', description: 'Id da safra', type: String })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
