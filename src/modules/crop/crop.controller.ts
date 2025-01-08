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
import { CreateCropResponseDto } from './dto/response/create-crop.response.dto';
import { FindOneByIdCropRequestDto } from './dto/request/findOneById-crop.request.dto';
import { FindOneByIdCropResponseDto } from './dto/response/findOneById-harvest.response.dto';
import { FindAllCropResponseDto } from './dto/response/findAll-harvest.response.dto';
import { FindAllCropQueryRequestDto } from './dto/request/findAll-crop.request.dto';
import { CropService } from './crop.service';
import { CreateCropRequestDto } from './dto/request/create-crop.request.dto';

@Controller('crop')
@ApiTags('Crop - Cultura')
export class CropController {
  constructor(private CropService: CropService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de uma nova cultura' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Cultura criada com sucesso',
    type: CreateCropResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Nome da cultura ja cadastrado',
  })
  create(
    @Body()
    input: CreateCropRequestDto,
  ): Promise<CreateCropResponseDto> {
    return this.CropService.create(input);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Realiza a busca de uma cultura por id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cultura obtida com sucesso',
    type: FindOneByIdCropResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cultura não encontrado por id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id da cultura',
    type: String,
  })
  async findOneById(
    @Param() { id }: FindOneByIdCropRequestDto,
  ): Promise<FindOneByIdCropResponseDto> {
    return this.CropService.findOneById(id);
  }

  @Get()
  @ApiOperation({
    summary:
      'Realiza a busca paginada de todas as culturas na base, usando como base os filtros',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Culturas paginadas e quantidade obtidas com sucesso',
    type: FindAllCropResponseDto,
  })
  @Get()
  async findAll(
    @Query()
    input: FindAllCropQueryRequestDto,
  ): Promise<FindAllCropResponseDto> {
    return this.CropService.findAll(input);
  }
}
