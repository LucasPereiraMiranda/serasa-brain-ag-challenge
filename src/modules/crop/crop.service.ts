import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCropResponseDto } from './dto/response/create-crop.response.dto';
import { CreateCropRequestDto } from './dto/request/create-crop.request.dto';
import { Crop } from './crop.entity';
import { FindOneByIdCropResponseDto } from './dto/response/findOneById-harvest.response.dto';
import { FindAllCropResponseDto } from './dto/response/findAll-harvest.response.dto';
import { FindAllCropQueryRequestDto } from './dto/request/findAll-crop.request.dto';

@Injectable()
export class CropService {
  constructor(
    @InjectRepository(Crop)
    private cropRepository: Repository<Crop>,
  ) {}

  async create(data: CreateCropRequestDto): Promise<CreateCropResponseDto> {
    const crop = this.cropRepository.create(data);
    return await this.cropRepository.save(crop);
  }

  async findOneById(id: string): Promise<FindOneByIdCropResponseDto> {
    const crop = await this.cropRepository.findOne({
      where: { id },
    });

    if (!crop) {
      throw new NotFoundException(`crop with id ${id} not found`);
    }

    return crop;
  }

  async findAll(
    input: FindAllCropQueryRequestDto,
  ): Promise<FindAllCropResponseDto> {
    const { take, skip } = input;
    const [data, count] = await this.cropRepository.findAndCount({
      take,
      skip,
    });

    return {
      data,
      count,
    };
  }
}
