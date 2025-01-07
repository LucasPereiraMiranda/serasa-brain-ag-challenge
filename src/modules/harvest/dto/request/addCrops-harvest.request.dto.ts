import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsArray, IsString } from 'class-validator';

export class AddCropsHarvestParamRequestDto {
  [x: string]: string;
  @ApiProperty({
    type: String,
    example: 'd8a9a870-b9f7-4a14-bcb6-8bfa1461e029',
    description: 'Id da safra que terá culturas adicionadas',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class AddCropsHarvestBodyRequestDto {
  @ApiProperty({
    type: [String],
    example: ['a8a9a870-b9f7-4a14-bcb6-8bfa1461e029'],
    description: 'Lista de ids das culturas a serem adicionadas da safra',
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  cropIds: string[];
}
