import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateGrowerRequestDto {
  @ApiProperty({
    description: 'Nome completo do proprietário',
    type: String,
    example: 'Lucas Pereira Miranda',
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    type: String,
    example: '73984910002',
    description:
      'Documento do proprietário. Pode ser um CPF ou CNPJ. Observação: deve ser enviado sem máscara',
  })
  @IsNotEmpty()
  @IsString()
  document: string;
}
