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
    createAgriculturalPropertyRequestDto: CreateAgriculturalPropertyRequestDto,
  ): Promise<CreateAgriculturalPropertyResponseDto> {
    return this.agriculturalPropertyService.create(
      createAgriculturalPropertyRequestDto,
    );
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
}
