import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvokeHealthCheckResponseDto } from './dto/response/invoke-health-check.response.dto';

@Controller('health-check')
@ApiTags('Análise de saúde da API - Health Check')
export class HealthCheckController {
  constructor(private healthCheckService: HealthCheckService) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna o status de saúde dos componentes da aplicação',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Indica o status de saúde geral da aplicação e seus componentes',
    type: InvokeHealthCheckResponseDto,
  })
  async check(): Promise<InvokeHealthCheckResponseDto> {
    return await this.healthCheckService.invoke();
  }
}
