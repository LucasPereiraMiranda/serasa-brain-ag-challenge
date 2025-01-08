import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import {
  MockRepository,
  repositoryMockFactory,
} from '../../common/tests/repository-mock';
import { Grower } from '../../grower/grower.entity';
import { Harvest } from '../harvest.entity';
import { HarvestService } from '../harvest.service';
import { AgriculturalPropertyService } from '../../agricutural-property/agricultural-property.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AgriculturalProperty } from '../../agricutural-property/agricultural-property.entity';
import {
  harvestMock,
  harvestToCropsBeansMock,
  harvestToCropsCornMock,
} from './mocks/harvest.mock';
import { agriculturalPropertyMock } from '../../agricutural-property/__tests__/mocks/agricultural-property.mock';
import { CropService } from '../../crop/crop.service';
import { HarvestToCrop } from '../../harvest-to-crop/harvest-to-crop.entity';
import { GrowerService } from '../../grower/grower.service';
import { Crop } from '../../crop/crop.entity';
import {
  cropBeansMock,
  cropCornMock,
} from '../../crop/__tests__/mocks/crop.mock';

describe('HarvestService', () => {
  let harvestService: HarvestService;
  let agriculturalPropertyService: AgriculturalPropertyService;
  let cropService: CropService;
  let harvestRepositoryMock: MockRepository<Repository<Harvest>>;
  let harvestToCropRepositoryMock: MockRepository<Repository<HarvestToCrop>>;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestService,
        AgriculturalPropertyService,
        CropService,
        GrowerService,
        {
          provide: getRepositoryToken(Harvest),
          useValue: repositoryMockFactory<Harvest>(),
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
      ],
    }).compile();

    harvestService = module.get<HarvestService>(HarvestService);
    agriculturalPropertyService = module.get<AgriculturalPropertyService>(
      AgriculturalPropertyService,
    );
    cropService = module.get<CropService>(CropService);
    harvestRepositoryMock = module.get(getRepositoryToken(Harvest));
    harvestToCropRepositoryMock = module.get(getRepositoryToken(HarvestToCrop));
  });

  beforeEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(harvestService).toBeDefined();
  });

  describe('create harvest', () => {
    it('should successfully create harvest', async () => {
      harvestRepositoryMock.create = jest.fn().mockResolvedValue(harvestMock);

      agriculturalPropertyService.findOneById = jest
        .fn()
        .mockResolvedValue(agriculturalPropertyMock);

      const result = await harvestService.create(harvestMock);

      expect(result).toEqual(harvestMock);
    });

    it('should throw if failed to find agricultural property to create harvest', async () => {
      jest
        .spyOn(agriculturalPropertyService, 'findOneById')
        .mockImplementation(() => {
          throw new Error();
        });

      expect(harvestService.create(harvestMock)).rejects.toThrow();
    });
  });

  describe('find one by id', () => {
    it('should successfully find one harvest by id', async () => {
      harvestRepositoryMock.findOne = jest.fn().mockResolvedValue(harvestMock);

      const result = await harvestService.findOneById(harvestMock.id);

      expect(result).toEqual(harvestMock);
    });

    it('should throw if harvest not found by id', async () => {
      harvestRepositoryMock.findOne = jest.fn().mockResolvedValue(undefined);

      expect(harvestService.findOneById(harvestMock.id)).rejects.toThrow();
    });
  });

  describe('find all harvests', () => {
    it('should successfully find all harvests', async () => {
      harvestRepositoryMock.findAndCount = jest
        .fn()
        .mockResolvedValue([[harvestMock], 1]);

      const result = await harvestService.findAll({
        take: 10,
        skip: 0,
      });

      expect(result.data).toEqual([harvestMock]);
      expect(result.count).toEqual(1);
    });
  });

  describe('add crops to harvest', () => {
    it('should successfully add crops to harvest', async () => {
      harvestRepositoryMock.findOne = jest
        .fn()
        .mockResolvedValueOnce({
          ...harvestMock,
          harvestToCrops: [harvestToCropsBeansMock],
        })
        .mockResolvedValue({
          ...harvestMock,
          harvestToCrops: [harvestToCropsBeansMock, harvestToCropsCornMock],
        });

      cropService.findByIds = jest.fn().mockResolvedValue([cropCornMock]);

      harvestToCropRepositoryMock.create = jest
        .fn()
        .mockResolvedValue([harvestToCropsBeansMock, harvestToCropsCornMock]);
      harvestToCropRepositoryMock.save = jest.fn().mockResolvedValue(undefined);

      const result = await harvestService.addCropsToHarvest(harvestMock.id, [
        cropBeansMock.id,
      ]);

      expect(result).toStrictEqual({
        ...harvestMock,
        harvestToCrops: [harvestToCropsBeansMock, harvestToCropsCornMock],
      });
    });

    it('should throw if existent crops to add is empty', async () => {
      harvestRepositoryMock.findOne = jest.fn().mockResolvedValueOnce({
        ...harvestMock,
        harvestToCrops: [harvestToCropsBeansMock],
      });

      cropService.findByIds = jest.fn().mockResolvedValue([]);

      expect(
        harvestService.addCropsToHarvest(harvestMock.id, [cropBeansMock.id]),
      ).rejects.toThrow();
    });
  });

  describe('remove crops from harvest', () => {
    it('should successfully remove crops from harvest', async () => {
      harvestRepositoryMock.findOne = jest
        .fn()
        .mockResolvedValueOnce({
          ...harvestMock,
          harvestToCrops: [harvestToCropsBeansMock, harvestToCropsCornMock],
        })
        .mockResolvedValue({
          ...harvestMock,
          harvestToCrops: [harvestToCropsBeansMock],
        });

      cropService.findByIds = jest.fn().mockResolvedValue([cropCornMock]);

      harvestToCropRepositoryMock.remove = jest
        .fn()
        .mockResolvedValue(undefined);

      const result = await harvestService.removeCropsFromHarvest(
        harvestMock.id,
        [cropCornMock.id],
      );

      expect(result).toStrictEqual({
        ...harvestMock,
        harvestToCrops: [harvestToCropsBeansMock],
      });
    });

    it('should throw if existent crops to remove is empty', async () => {
      harvestRepositoryMock.findOne = jest.fn().mockResolvedValueOnce({
        ...harvestMock,
        harvestToCrops: [harvestToCropsBeansMock],
      });

      cropService.findByIds = jest.fn().mockResolvedValue([]);

      expect(
        harvestService.removeCropsFromHarvest(harvestMock.id, [
          cropCornMock.id,
        ]),
      ).rejects.toThrow();
    });
  });
});
