import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneByIdCropRequestDto {
  @ApiProperty({ name: 'id', description: 'Id da cultura', type: String })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
