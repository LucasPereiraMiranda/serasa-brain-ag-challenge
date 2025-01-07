import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneByIdAgriculturalPropertyRequestDto {
  @ApiProperty({
    name: 'id',
    description: 'Id da propriedade agrícola',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
