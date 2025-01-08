import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AgriculturalPropertyService } from './agricultural-property.service';
import { CreateAgriculturalPropertyRequestDto } from './dto/request/create-agricultural-property.request.dto';
import { CreateAgriculturalPropertyResponseDto } from './dto/response/create-agricultural-property.response.dto';
import { FindOneByIdAgriculturalPropertyRequestDto } from './dto/request/findOneById-agricultural-property.request.dto';
import { FindOneByIdAgriculturalPropertyResponseDto } from './dto/response/findOneById-agricultural-property.response.dto';
import { FindAllAgriculturalPropertyResponseDto } from './dto/response/findAll-agricultural-property.response.dto';
import { FindAllAgriculturalPropertyQueryRequestDto } from './dto/request/findAll-agricultural-property.request.dto';
import { DashboardTotalPropertiesResponseDto } from './dto/response/dashboardTotalProperties.response.dto';
import { DashboardPropertiesByStateItemResponseDto } from './dto/response/dashboardPropertiesByState.response.dto copy';
import { DashboardPropertiesByCropItemResponseDto } from './dto/response/dashboardPropertiesByCrop.response.dto';
import { DashboardLandUseResponseDto } from './dto/response/dashboardLandUse.response.dto';
@Controller('agricultural-property')
@ApiTags('Propriedades Agrícola - Agricultural Property')
export class AgriculturalPropertyController {
  constructor(
    private agriculturalPropertyService: AgriculturalPropertyService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criação de uma nova propriedade agrícola' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Propriedade Agrícola criada com sucesso',
    type: CreateAgriculturalPropertyRequestDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'A área cultivável e a área de vegetação combinadas não devem ser maiores do que a área total',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Proprietário mapeado para a propriedade não encontrado',
  })
  create(
    @Body()
    input: CreateAgriculturalPropertyRequestDto,
  ): Promise<CreateAgriculturalPropertyResponseDto> {
    return this.agriculturalPropertyService.create(input);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Realiza a busca de uma propriedade agrícola por id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Propriedade agrícola obtida com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Propriedade agrícola não encontrado por id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id da propriedade agrícola',
    type: String,
  })
  async findOneById(
    @Param() { id }: FindOneByIdAgriculturalPropertyRequestDto,
  ): Promise<FindOneByIdAgriculturalPropertyResponseDto> {
    return this.agriculturalPropertyService.findOneById(id);
  }

  @Get()
  @ApiOperation({
    summary:
      'Realiza a busca paginada de todas as propriedades agrícolas na base, usando como base os filtros',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Propriedades agrícolas paginadas e quantidade obtidas com sucesso',
    type: FindAllAgriculturalPropertyResponseDto,
  })
  @Get()
  async findAll(
    @Query()
    input: FindAllAgriculturalPropertyQueryRequestDto,
  ): Promise<FindAllAgriculturalPropertyResponseDto> {
    return this.agriculturalPropertyService.findAll(input);
  }

  @ApiOperation({
    summary:
      '[Dashboard] Indica o total de fazendas e a soma de todas as areas totais',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Total de fazendas e a soma de todas as areas totais obtidas com sucesso',
    type: DashboardTotalPropertiesResponseDto,
  })
  @Get('/dashboard/total')
  async dashboardTotalProperties(): Promise<DashboardTotalPropertiesResponseDto> {
    return this.agriculturalPropertyService.dashboardTotalProperties();
  }

  @ApiOperation({
    summary: '[Dashboard] Indica o total de fazendas por estado',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Total de fazendas por estado obtidas com sucesso',
    type: [DashboardPropertiesByStateItemResponseDto],
  })
  @Get('/dashboard/total-by-state')
  async dashboardPropertiesByState(): Promise<
    DashboardPropertiesByStateItemResponseDto[]
  > {
    return this.agriculturalPropertyService.dashboardPropertiesByState();
  }

  @ApiOperation({
    summary:
      '[Dashboard] Indica as métricas das propriedades rurais por cultura',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Métricas das propriedades rurais por cultura obtidas com sucesso',
    type: [DashboardPropertiesByCropItemResponseDto],
  })
  @Get('/dashboard/total-by-crop')
  async dashboardPropertiesByCrop(): Promise<
    DashboardPropertiesByCropItemResponseDto[]
  > {
    return this.agriculturalPropertyService.dashboardPropertiesByCrop();
  }

  @ApiOperation({
    summary: '[Dashboard] Indica as metricas de uso do solo',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Metricas de uso do solo obtidas com sucesso',
    type: DashboardLandUseResponseDto,
  })
  @Get('/dashboard/land-use')
  async dashboardLandUse(): Promise<DashboardLandUseResponseDto> {
    return this.agriculturalPropertyService.dashboardLandUse();
  }
}
