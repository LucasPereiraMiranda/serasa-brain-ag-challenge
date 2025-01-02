import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteGrowerRequestDto {
  @ApiProperty({ name: 'id', description: 'Id do proprietário', type: String })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
