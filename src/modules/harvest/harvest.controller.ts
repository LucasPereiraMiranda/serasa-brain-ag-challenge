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
import { HarvestService } from './harvest.service';
import { CreateHarvestResponseDto } from './dto/response/create-harvest.response.dto';
import { FindOneByIdHarvestRequestDto } from './dto/request/findOneById-harvest.request.dto';
import { FindOneByIdHarvestResponseDto } from './dto/response/findOneById-harvest.response.dto';
import { FindAllHarvestResponseDto } from './dto/response/findAll-harvest.response.dto';
import { FindAllHarvestQueryRequestDto } from './dto/request/findAll-harvest.request.dto';

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
    createHarvestRequestDto: any,
  ): Promise<CreateHarvestResponseDto> {
    return this.harvestService.create(createHarvestRequestDto);
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
  @Get()
  async findAll(
    @Query()
    input: FindAllHarvestQueryRequestDto,
  ): Promise<FindAllHarvestResponseDto> {
    return this.harvestService.findAll(input);
  }
}
