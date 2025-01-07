import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Harvest } from './harvest.entity';
import { CreateHarvestResponseDto } from './dto/response/create-harvest.response.dto';
import { CreateHarvestRequestDto } from './dto/request/create-harvest.request.dto';
import { FindOneByIdHarvestResponseDto } from './dto/response/findOneById-harvest.response.dto';
import { FindAllHarvestQueryRequestDto } from './dto/request/findAll-harvest.request.dto';
import { FindAllHarvestResponseDto } from './dto/response/findAll-harvest.response.dto';
import { AgriculturalPropertyService } from '../agricutural-property/agricultural-property.service';

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,
    @Inject(AgriculturalPropertyService)
    private agriculturalPropertyService: AgriculturalPropertyService,
  ) {}

  async create(
    data: CreateHarvestRequestDto,
  ): Promise<CreateHarvestResponseDto> {
    const { agriculturalPropertyId } = data;

    const agriculturalProperty =
      await this.agriculturalPropertyService.findOneById(
        agriculturalPropertyId,
      );
    const harvest = this.harvestRepository.create({
      ...data,
      agriculturalProperty,
    });
    return this.harvestRepository.save(harvest);
  }

  async findOneById(id: string): Promise<FindOneByIdHarvestResponseDto> {
    const harvest = await this.harvestRepository.findOne({
      where: { id },
    });

    if (!harvest) {
      throw new NotFoundException(`Harvest with id ${id} not found`);
    }

    return harvest;
  }

  async findAll(
    input: FindAllHarvestQueryRequestDto,
  ): Promise<FindAllHarvestResponseDto> {
    const { take, skip, agriculturalPropertyId } = input;
    const [data, count] = await this.harvestRepository.findAndCount({
      where: {
        agriculturalProperty: { id: agriculturalPropertyId },
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
