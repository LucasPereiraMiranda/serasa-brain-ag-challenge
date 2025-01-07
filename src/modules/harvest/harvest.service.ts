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
import { CropService } from '../crop/crop.service';
import { HarvestToCrop } from '../harvest-to-crop/harvest-to-crop.entity';

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,
    @Inject(AgriculturalPropertyService)
    private agriculturalPropertyService: AgriculturalPropertyService,
    @Inject(CropService)
    private cropService: CropService,
    @InjectRepository(HarvestToCrop)
    private harvestToCropRepository: Repository<HarvestToCrop>,
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
      relations: ['harvestToCrops', 'harvestToCrops.crop'],
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

  async addCropsToHarvest(harvestId: string, cropIds: string[]): Promise<any> {
    const harvest = await this.findOneById(harvestId);

    const cropsToAdd = await this.cropService.findByIds(cropIds);

    if (cropsToAdd.length === 0) {
      throw new NotFoundException('No crops found with the provided IDs');
    }

    const existingCropIds = new Set(
      harvest.harvestToCrops.map((harvestToCrop) => harvestToCrop.crop.id),
    );
    const newRelations = cropsToAdd
      .filter((crop) => !existingCropIds.has(crop.id))
      .map((crop) => {
        const harvestToCrop = this.harvestToCropRepository.create({
          harvest,
          crop,
        });
        return harvestToCrop;
      });

    await this.harvestToCropRepository.save([
      ...harvest.harvestToCrops,
      ...newRelations,
    ]);

    return await this.findOneById(harvestId);
  }

  async removeCropsFromHarvest(
    harvestId: string,
    cropIds: string[],
  ): Promise<Harvest> {
    const harvest = await this.findOneById(harvestId);

    const cropsToRemove = harvest.harvestToCrops.filter((harvestToCrop) =>
      cropIds.includes(harvestToCrop.crop.id),
    );

    if (cropsToRemove.length === 0) {
      throw new NotFoundException('No crops found to remove.');
    }

    await this.harvestToCropRepository.remove(cropsToRemove);

    return await this.findOneById(harvestId);
  }
}
