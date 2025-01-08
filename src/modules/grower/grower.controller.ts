import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GrowerService } from './grower.service';
import { CreateGrowerRequestDto } from './dto/request/create-grower.request.dto';
import { CreateGrowerResponseDto } from './dto/response/create-grower.response.dto';
import {
  UpdateGrowerBodyRequestDto,
  UpdateGrowerParamsRequestDto,
} from './dto/request/update-grower.request.dto';
import { DeleteGrowerResponseDto } from './dto/response/delete-grower.response.dto';
import { DeleteGrowerRequestDto } from './dto/request/delete-grower.request.dto';
import { FindAllGrowerResponseDto } from './dto/response/findAll-grower.response.dto';
import { FindOneByIdGrowerParamsRequestDto } from './dto/request/findOneById-grower.request.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateGrowerResponseDto } from './dto/response/update-grower.request.dto';
import { FindOneByIdGrowerResponseDto } from './dto/response/findOneById-grower.response.dto';
import { FindAllGrowerQueryRequestDto } from './dto/request/findAll-grower.request.dto';

@Controller('growers')
@ApiTags('Proprietários - Growers')
export class GrowerController {
  constructor(private growerService: GrowerService) {}

  @Post()
  @ApiOperation({ summary: 'Criação de um novo proprietário' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Proprietário criado com sucesso',
    type: CreateGrowerResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Documento do proprietário já existente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Documento do proprietário inválido',
  })
  create(
    @Body() createGrowerRequestDto: CreateGrowerRequestDto,
  ): Promise<CreateGrowerResponseDto> {
    return this.growerService.create(createGrowerRequestDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualização de um proprietário existente' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Proprietário atualizado com sucesso',
    type: UpdateGrowerResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Proprietário não encontrado por id',
  })
  @ApiParam({ name: 'id', description: 'Id do proprietário', type: String })
  async update(
    @Param() updateGrowerParamsRequestDto: UpdateGrowerParamsRequestDto,
    @Body() updateGrowerBodyRequestDto: UpdateGrowerBodyRequestDto,
  ): Promise<UpdateGrowerResponseDto> {
    return this.growerService.update(
      updateGrowerParamsRequestDto,
      updateGrowerBodyRequestDto,
    );
  }

  @Get()
  @ApiOperation({
    summary:
      'Realiza a busca paginada de todos os proprietários existentes na base',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Proprietários paginados e quantidade obtidos com sucesso',
    type: FindAllGrowerResponseDto,
  })
  @Get()
  async findAll(
    @Query()
    findAllGrowerQueryRequestDto: FindAllGrowerQueryRequestDto,
  ): Promise<FindAllGrowerResponseDto> {
    return this.growerService.findAll(findAllGrowerQueryRequestDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Realiza a busca de um proprietário por id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Proprietário obtido com sucesso',
    type: FindOneByIdGrowerResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Proprietário não encontrado por id',
  })
  @ApiParam({ name: 'id', description: 'Id do proprietário', type: String })
  async findOneById(
    @Param() { id }: FindOneByIdGrowerParamsRequestDto,
  ): Promise<FindOneByIdGrowerResponseDto> {
    return this.growerService.findOneById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleção de um proprietário existente' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Proprietário deletado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Proprietário não encontrado por id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Não foi possível remover o proprietário devido a ele possuir propriedades associadas',
  })
  @ApiParam({ name: 'id', description: 'Id do proprietário', type: String })
  delete(
    @Param() { id }: DeleteGrowerRequestDto,
  ): Promise<DeleteGrowerResponseDto> {
    return this.growerService.delete(id);
  }
}
