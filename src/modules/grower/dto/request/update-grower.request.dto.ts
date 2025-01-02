import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateGrowerParamsRequestDto {
  @ApiProperty({ name: 'id', description: 'Id do proprietário', type: String })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class UpdateGrowerBodyRequestDto {
  @ApiProperty({
    type: String,
    example: 'Lucas Miranda',
    description: 'Nome completo do proprietário',
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;
}
