import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, Matches } from 'class-validator';

export class CreateAgriculturalPropertyRequestDto {
  @ApiProperty({
    type: String,
    example: 'Fazenda Aroeira',
    description: 'Nome da propriedade agrícola',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Felixlândia',
    description: 'Nome da cidade em que a propriedade está contida',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    type: String,
    example: 'MG',
    description: 'Sigla do estado em que a propriedade agrícola está contida.',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/,
    {
      message:
        'O estado deve ser uma sigla válida de 2 caracteres correspondente a um estado brasileiro',
    },
  )
  state: string;

  @ApiProperty({
    type: Number,
    example: 150.0,
    description: 'Área total da propriedade agrícola em hectares',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  totalArea: number;

  @ApiProperty({
    type: Number,
    example: 110.0,
    description: 'Área arável na propriedade agrícola em hectares',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  arableArea: number;

  @ApiProperty({
    type: Number,
    example: 40.0,
    description:
      'Área de preservação não arável na propriedade agrícola em hectares',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  vegetationArea: number;

  @ApiProperty({
    type: String,
    example: 'f8a9a870-b9f7-4a14-bcb6-8bfa1461e029',
    description: 'ID do produtor ao qual a propriedade está vinculada',
  })
  @IsNotEmpty()
  @IsString()
  growerId: string;
}
