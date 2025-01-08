import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HarvestService } from './harvest.service';
import { CreateHarvestResponseDto } from './dto/response/create-harvest.response.dto';
import { FindOneByIdHarvestRequestDto } from './dto/request/findOneById-harvest.request.dto';
import { FindOneByIdHarvestResponseDto } from './dto/response/findOneById-harvest.response.dto';
import { FindAllHarvestResponseDto } from './dto/response/findAll-harvest.response.dto';
import { FindAllHarvestQueryRequestDto } from './dto/request/findAll-harvest.request.dto';
import {
  AddCropsHarvestBodyRequestDto,
  AddCropsHarvestParamRequestDto,
} from './dto/request/addCrops-harvest.request.dto';
import {
  RemoveCropsHarvestBodyRequestDto,
  RemoveCropsHarvestParamRequestDto,
} from './dto/request/removeCrops-harvest.request.dto';
import { CreateHarvestRequestDto } from './dto/request/create-harvest.request.dto';
import { AddCropsHarvestResponseDto } from './dto/response/addCrops-harvest.response.dto';
import { RemoveCropsHarvestResponseDto } from './dto/response/removeCrops-harvest.response.dto';

@Controller('harvest')
@ApiTags('Harvest - Safra')
export class HarvestController {
  constructor(private harvestService: HarvestService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de uma nova safra' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Safra criada com sucesso',
    type: CreateHarvestResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Propriedade agrícola mapeada para a safra não foi encontrada',
  })
  create(
    @Body()
    body: CreateHarvestRequestDto,
  ): Promise<CreateHarvestResponseDto> {
    return this.harvestService.create(body);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Realiza a busca de uma safra por id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Safra obtida com sucesso',
    type: FindOneByIdHarvestResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Safra não encontrado por id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id da safra',
    type: String,
  })
  async findOneById(
    @Param() { id }: FindOneByIdHarvestRequestDto,
  ): Promise<FindOneByIdHarvestResponseDto> {
    return this.harvestService.findOneById(id);
  }

  @Get()
  @ApiOperation({
    summary:
      'Realiza a busca paginada de todas as safras na base, usando como base os filtros',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Safras paginadas e quantidade obtidas com sucesso',
    type: FindAllHarvestResponseDto,
  })
  async findAll(
    @Query()
    queries: FindAllHarvestQueryRequestDto,
  ): Promise<FindAllHarvestResponseDto> {
    return this.harvestService.findAll(queries);
  }

  @ApiOperation({
    summary: 'Realiza a adição de culturas em uma safra',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Culturas adicionadas a uma safra com sucesso',
    type: AddCropsHarvestResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'Ids associados as culturas não foram encontrados | Id associado a safra não foi encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'Id da safra que terá culturas adicionadas',
    type: String,
  })
  @Post(':id/crops')
  async addCrops(
    @Param() params: AddCropsHarvestParamRequestDto,
    @Body() body: AddCropsHarvestBodyRequestDto,
  ) {
    const { id } = params;
    const { cropIds } = body;
    return this.harvestService.addCropsToHarvest(id, cropIds);
  }

  @ApiOperation({
    summary: 'Realiza a remoção de culturas em uma safra',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Culturas removidas de uma safra com sucesso',
    type: RemoveCropsHarvestResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'Ids associados as culturas não foram encontrados | Id associado a safra não foi encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'Id da safra que terá culturas removidas',
    type: String,
  })
  @Delete(':id/crops')
  async removeCrops(
    @Param() params: RemoveCropsHarvestParamRequestDto,
    @Body() body: RemoveCropsHarvestBodyRequestDto,
  ) {
    const { id } = params;
    const { cropIds } = body;
    return this.harvestService.removeCropsFromHarvest(id, cropIds);
  }
}
