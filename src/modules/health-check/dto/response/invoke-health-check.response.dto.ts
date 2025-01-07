import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckComponentDto {
  @ApiProperty({
    type: String,
    example: 'Database',
    description: 'Nome do componente que foi verificado',
  })
  name: string;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Status do componente (true = OK, false = ERROR)',
  })
  status: boolean;

  @ApiProperty({
    type: String,
    example: 'Connected',
    description: 'Detalhes sobre o status do componente',
    required: false,
  })
  details: string;
}

export class InvokeHealthCheckResponseDto {
  @ApiProperty({
    type: Number,
    example: 16.56,
    description: 'Tempo de execução do processo em segundos',
  })
  uptime: number;

  @ApiProperty({
    type: String,
    example: 'OK',
    description: 'Mensagem geral sobre o status de saúde da aplicação',
  })
  healthMessage: string;

  @ApiProperty({
    type: [HealthCheckComponentDto],
    description: 'Lista de componentes analisados',
  })
  checks: HealthCheckComponentDto[];
}
