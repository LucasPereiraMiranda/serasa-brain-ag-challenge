import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCropRequestDto {
  @ApiProperty({
    type: String,
    example: 'Milho',
    description: 'Nome da cultura',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
