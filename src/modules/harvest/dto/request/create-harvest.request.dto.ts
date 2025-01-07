import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, Length, IsUUID } from 'class-validator';

export class CreateHarvestRequestDto {
  @ApiProperty({
    type: String,
    example: 'Safrinha 2021',
    description: 'Nome da safra',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: '2021',
    description:
      'Ano associado à safra, deve conter exatamente 4 dígitos numéricos',
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  @Matches(/^\d{4}$/, {
    message: 'The year must contain exactly 4 numeric digits.',
  })
  year: string;

  @ApiProperty({
    type: String,
    example: 'a8a9a870-b9f7-4a14-bcb6-8bfa1461e029',
    description: 'ID da propriedade agrícola ao qual a safra está vinculada',
  })
  @IsNotEmpty()
  @IsUUID()
  agriculturalPropertyId: string;
}
