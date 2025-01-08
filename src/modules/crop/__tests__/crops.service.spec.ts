import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import {
  MockRepository,
  repositoryMockFactory,
} from '../../common/tests/repository-mock';
import { Grower } from '../../grower/grower.entity';
import { AgriculturalPropertyService } from '../../agricutural-property/agricultural-property.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AgriculturalProperty } from '../../agricutural-property/agricultural-property.entity';
import { CropService } from '../../crop/crop.service';
import { HarvestToCrop } from '../../harvest-to-crop/harvest-to-crop.entity';
import { GrowerService } from '../../grower/grower.service';
import { Crop } from '../../crop/crop.entity';
import { HarvestService } from '../../harvest/harvest.service';
import { cropCornMock } from './mocks/crop.mock';
import { Harvest } from '../../harvest/harvest.entity';

describe('CropService', () => {
  let cropService: CropService;
  let repositoryMock: MockRepository<Repository<Crop>>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropService,
        AgriculturalPropertyService,
        HarvestService,
        GrowerService,
        {
          provide: getRepositoryToken(Crop),
          useValue: repositoryMockFactory<Crop>(),
        },
        {
          provide: getRepositoryToken(AgriculturalProperty),
          useValue: repositoryMockFactory<AgriculturalProperty>(),
        },
        {
          provide: getRepositoryToken(Grower),
          useValue: repositoryMockFactory<Grower>(),
        },
        {
          provide: getRepositoryToken(HarvestToCrop),
          useValue: repositoryMockFactory<HarvestToCrop>(),
        },
        {
          provide: getRepositoryToken(Crop),
          useValue: repositoryMockFactory<Crop>(),
        },
        {
          provide: getRepositoryToken(Harvest),
          useValue: repositoryMockFactory<Harvest>(),
        },
      ],
    }).compile();

    cropService = module.get<CropService>(CropService);
    repositoryMock = module.get(getRepositoryToken(Crop));
  });

  beforeEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(cropService).toBeDefined();
  });

  describe('create crop', () => {
    it('should successfully create crop', async () => {
      repositoryMock.findOne = jest.fn().mockResolvedValue(undefined);
      repositoryMock.create = jest.fn().mockResolvedValue(cropCornMock);
      repositoryMock.save = jest.fn().mockResolvedValue(cropCornMock);
      const result = await cropService.create(cropCornMock);

      expect(result).toEqual(cropCornMock);
    });

    it('should throw if crop name already exists', async () => {
      repositoryMock.findOne = jest.fn().mockResolvedValue(cropCornMock);
      expect(cropService.create(cropCornMock)).rejects.toThrow();
    });
  });

  describe('find one by id', () => {
    it('should successfully find one crop by id', async () => {
      repositoryMock.findOne = jest.fn().mockResolvedValue(cropCornMock);

      const result = await cropService.findOneById('id');

      expect(result).toEqual(cropCornMock);
    });

    it('should throw if crop not found by id', async () => {
      repositoryMock.findOne = jest.fn().mockResolvedValue(undefined);

      expect(cropService.findOneById('id')).rejects.toThrow();
    });
  });

  describe('find all crops', () => {
    it('should successfully find all crops', async () => {
      repositoryMock.findAndCount = jest
        .fn()
        .mockResolvedValue([[cropCornMock], 1]);

      const result = await cropService.findAll({
        take: 10,
        skip: 0,
      });

      expect(result.data).toEqual([cropCornMock]);
      expect(result.count).toEqual(1);
    });
  });

  describe('find by ids', () => {
    it('should successfully find crops by ids', async () => {
      repositoryMock.findBy = jest.fn().mockResolvedValue([cropCornMock]);

      const result = await cropService.findByIds([cropCornMock.id]);

      expect(result).toEqual([cropCornMock]);
    });
  });

  describe('find one by name', () => {
    it('should successfully find one crop by name', async () => {
      repositoryMock.findOne = jest.fn().mockResolvedValue(cropCornMock);

      const result = await cropService.findOneByName(cropCornMock.name);

      expect(result).toEqual(cropCornMock);
    });

    it('should return undefined if crop not found by name', async () => {
      repositoryMock.findOne = jest.fn().mockResolvedValue(undefined);

      const result = await cropService.findOneByName(cropCornMock.name);
      expect(result).toBeUndefined();
    });
  });
});
