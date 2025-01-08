import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgriculturalProperty } from './agricultural-property.entity';
import { CreateAgriculturalPropertyResponseDto } from './dto/response/create-agricultural-property.response.dto';
import { CreateAgriculturalPropertyRequestDto } from './dto/request/create-agricultural-property.request.dto';
import { GrowerService } from '../grower/grower.service';
import { FindOneByIdAgriculturalPropertyResponseDto } from './dto/response/findOneById-agricultural-property.response.dto';
import { FindAllAgriculturalPropertyQueryRequestDto } from './dto/request/findAll-agricultural-property.request.dto';
import { FindAllAgriculturalPropertyResponseDto } from './dto/response/findAll-agricultural-property.response.dto';

@Injectable()
export class AgriculturalPropertyService {
  constructor(
    @InjectRepository(AgriculturalProperty)
    private agriculturalPropertyRepository: Repository<AgriculturalProperty>,
    @Inject(GrowerService)
    private growerService: GrowerService,
  ) {}

  async create(
    agriculturalPropertyToCreate: CreateAgriculturalPropertyRequestDto,
  ): Promise<CreateAgriculturalPropertyResponseDto> {
    const { growerId, totalArea, arableArea, vegetationArea } =
      agriculturalPropertyToCreate;

    if (!this.isValidArea(totalArea, arableArea, vegetationArea)) {
      throw new BadRequestException(
        `The Arable Area and Vegetation Area combined should not be greater than the Total Area`,
      );
    }

    const grower = await this.growerService.findOneById(growerId);
    const agriculturalProperty = this.agriculturalPropertyRepository.create({
      ...agriculturalPropertyToCreate,
      grower,
    });
    return this.agriculturalPropertyRepository.save(agriculturalProperty);
  }

  private isValidArea(
    totalArea: number,
    arableArea: number,
    vegetationArea: number,
  ): boolean {
    return totalArea >= arableArea + vegetationArea;
  }

  async findOneById(
    id: string,
  ): Promise<FindOneByIdAgriculturalPropertyResponseDto> {
    const agriculturalProperty =
      await this.agriculturalPropertyRepository.findOne({
        where: { id },
      });

    if (!agriculturalProperty) {
      throw new NotFoundException(
        `Agricultural Property with id ${id} not found`,
      );
    }

    return agriculturalProperty;
  }

  async findAll(
    input: FindAllAgriculturalPropertyQueryRequestDto,
  ): Promise<FindAllAgriculturalPropertyResponseDto> {
    const { take, skip, growerId } = input;
    const [data, count] =
      await this.agriculturalPropertyRepository.findAndCount({
        where: {
          grower: { id: growerId },
        },
        take,
        skip,
      });

    return {
      data,
      count,
    };
  }
}
