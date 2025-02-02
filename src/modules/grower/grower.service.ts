import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grower } from './grower.entity';
import { CreateGrowerRequestDto } from './dto/request/create-grower.request.dto';
import { CreateGrowerResponseDto } from './dto/response/create-grower.response.dto';
import { isValidDocument } from '../common/utils/is-valid-document';
import {
  UpdateGrowerBodyRequestDto,
  UpdateGrowerParamsRequestDto,
} from './dto/request/update-grower.request.dto';
import { UpdateGrowerResponseDto } from './dto/response/update-grower.request.dto';
import { DeleteGrowerResponseDto } from './dto/response/delete-grower.response.dto';
import { FindAllGrowerResponseDto } from './dto/response/findAll-grower.response.dto';
import { FindAllGrowerQueryRequestDto } from './dto/request/findAll-grower.request.dto';
import { FindOneByIdGrowerResponseDto } from './dto/response/findOneById-grower.response.dto';

@Injectable()
export class GrowerService {
  constructor(
    @InjectRepository(Grower)
    private growerRepository: Repository<Grower>,
  ) {}

  async create(
    growerToCreate: CreateGrowerRequestDto,
  ): Promise<CreateGrowerResponseDto> {
    const { document } = growerToCreate;

    const alreadyExists = await this.findOneByDocument(document);
    if (alreadyExists) {
      throw new ConflictException(
        `Grower with document ${document} already exists`,
      );
    }

    const isValid = isValidDocument(document);
    if (!isValid) {
      throw new BadRequestException(`Document ${document} is not valid`);
    }

    return await this.growerRepository.save(growerToCreate);
  }

  async findOneByDocument(document: string): Promise<Grower> {
    const grower = await this.growerRepository.findOne({
      where: { document },
    });
    return grower;
  }

  async findAll(
    input: FindAllGrowerQueryRequestDto,
  ): Promise<FindAllGrowerResponseDto> {
    const { take, skip } = input;
    const [data, count] = await Promise.all([
      this.growerRepository.find({
        take,
        skip,
      }),
      this.growerRepository.count(),
    ]);

    return {
      data,
      count,
    };
  }

  async findOneById(
    id: string,
    relations?: string[],
  ): Promise<FindOneByIdGrowerResponseDto> {
    const grower = await this.growerRepository.findOne({
      where: { id },
      relations,
    });

    if (!grower) {
      throw new NotFoundException(`Grower with id ${id} not found`);
    }

    return grower;
  }

  async update(
    { id }: UpdateGrowerParamsRequestDto,
    updateGrowerRequestDto: UpdateGrowerBodyRequestDto,
  ): Promise<UpdateGrowerResponseDto> {
    const existentGrower = await this.findOneById(id);
    const grower = await this.growerRepository.preload({
      id: existentGrower.id,
      ...updateGrowerRequestDto,
    });

    return this.growerRepository.save(grower);
  }

  async delete(id: string): Promise<DeleteGrowerResponseDto> {
    const existentGrower = await this.findOneById(id, [
      'agriculturalProperties',
    ]);

    if (existentGrower?.agriculturalProperties?.length > 0) {
      throw new BadRequestException(
        `Unable to delete grower with id ${id}. This grower has one or more associated agricultural properties. Please remove or reassign the properties before attempting deletion.`,
      );
    }

    const { affected } = await this.growerRepository.delete({
      id: existentGrower.id,
    });
    return { deleted: affected > 0 };
  }
}
