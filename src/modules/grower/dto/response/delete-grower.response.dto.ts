import { ApiProperty } from '@nestjs/swagger';

export class DeleteGrowerResponseDto {
  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Indica se o proprietário foi deletado com sucesso',
  })
  deleted: boolean;
}
