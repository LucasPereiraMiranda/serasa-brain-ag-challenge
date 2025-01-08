import { Test, TestingModule } from '@nestjs/testing';
import { Repository, SelectQueryBuilder } from 'typeorm';

import {
  MockRepository,
  repositoryMockFactory,
} from '../../common/tests/repository-mock';
import { AgriculturalPropertyService } from '../agricultural-property.service';
import { AgriculturalProperty } from '../agricultural-property.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { agriculturalPropertyMock } from './mocks/agricultural-property.mock';
import { GrowerService } from '../../grower/grower.service';
import { Grower } from '../../../modules/grower/grower.entity';
import { growerCpfMock } from '../../../modules/grower/__tests__/mocks/grower.mock';
import { selectQueryBuilderMock } from '../../common/tests/select-query-builder.mock';

describe('AgriculturalPropertyService', () => {
  let agriculturalPropertyService: AgriculturalPropertyService;
  let growerService: GrowerService;
  let repositoryMock: MockRepository<Repository<AgriculturalProperty>>;
  let selectQueryBuilder: SelectQueryBuilder<any>;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgriculturalPropertyService,
        GrowerService,
        {
          provide: getRepositoryToken(AgriculturalProperty),
          useValue: repositoryMockFactory<AgriculturalProperty>(),
        },
        {
          provide: getRepositoryToken(Grower),
          useValue: repositoryMockFactory<Grower>(),
        },
      ],
    }).compile();

    agriculturalPropertyService = module.get<AgriculturalPropertyService>(
      AgriculturalPropertyService,
    );
    selectQueryBuilder = selectQueryBuilderMock();
    growerService = module.get<GrowerService>(GrowerService);
    repositoryMock = module.get(getRepositoryToken(AgriculturalProperty));
    jest
      .spyOn(repositoryMock, 'createQueryBuilder')
      .mockReturnValue(selectQueryBuilder);
  });

  beforeEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(agriculturalPropertyService).toBeDefined();
  });

  describe('create agricultural property', () => {
    it('should successfully create agricultural property', async () => {
      repositoryMock.create = jest
        .fn()
        .mockResolvedValue(agriculturalPropertyMock);

      growerService.findOneById = jest.fn().mockResolvedValue(growerCpfMock);

      const result = await agriculturalPropertyService.create(
        agriculturalPropertyMock,
      );

      expect(result).toEqual(agriculturalPropertyMock);
    });

    it('should throw if area sum is not valid', async () => {
      expect(
        agriculturalPropertyService.create({
          ...agriculturalPropertyMock,
          vegetationArea: 200,
        }),
      ).rejects.toThrow();
    });

    it('should throw if failed to find grower to create agricultural property', async () => {
      jest.spyOn(growerService, 'findOneById').mockImplementation(() => {
        throw new Error();
      });

      expect(
        agriculturalPropertyService.create(agriculturalPropertyMock),
      ).rejects.toThrow();
    });
  });

  describe('find one by id', () => {
    it('should successfully find one agricultural property by id', async () => {
      repositoryMock.findOne = jest
        .fn()
        .mockResolvedValue(agriculturalPropertyMock);

      const result = await agriculturalPropertyService.findOneById('id');

      expect(result).toEqual(agriculturalPropertyMock);
    });

    it('should throw if agricultural property not found by id', async () => {
      repositoryMock.findOne = jest.fn().mockResolvedValue(undefined);

      expect(agriculturalPropertyService.findOneById('id')).rejects.toThrow();
    });
  });

  describe('find all agricultural properties', () => {
    it('should successfully find all agricultural properties', async () => {
      repositoryMock.findAndCount = jest
        .fn()
        .mockResolvedValue([[agriculturalPropertyMock], 1]);

      const result = await agriculturalPropertyService.findAll({
        take: 10,
        skip: 0,
      });

      expect(result.data).toEqual([agriculturalPropertyMock]);
      expect(result.count).toEqual(1);
    });
  });

  describe('dashboard total properties', () => {
    it('should successfully find total agricultural properties', async () => {
      repositoryMock.count = jest.fn().mockResolvedValue(3);
      repositoryMock.sum = jest.fn().mockResolvedValue(480);

      const result =
        await agriculturalPropertyService.dashboardTotalProperties();

      expect(result).toEqual({
        count: 3,
        sumTotalArea: 480,
      });
    });

    it('should successfully find total agricultural properties as 0, if values are nullable', async () => {
      repositoryMock.count = jest.fn().mockResolvedValue(null);
      repositoryMock.sum = jest.fn().mockResolvedValue(null);

      const result =
        await agriculturalPropertyService.dashboardTotalProperties();

      expect(result).toEqual({
        count: 0,
        sumTotalArea: 0,
      });
    });
  });

  describe('dashboard properties by state', () => {
    it('should successfully find properties by state', async () => {
      jest.spyOn(selectQueryBuilder, 'getRawMany').mockReturnValue([
        {
          state: 'MG',
          count: '2',
        },
        {
          state: 'SP',
          count: '1',
        },
      ] as any);

      const result =
        await agriculturalPropertyService.dashboardPropertiesByState();

      expect(result).toEqual([
        {
          state: 'MG',
          count: 2,
        },
        {
          state: 'SP',
          count: 1,
        },
      ]);
    });
  });

  describe('dashboard properties by crop', () => {
    it('should successfully find properties by crop', async () => {
      jest.spyOn(selectQueryBuilder, 'getRawMany').mockReturnValue([
        {
          cropName: 'Mandioca',
          count: '1',
          sumTotalArea: '180',
        },
        {
          cropName: 'Milho',
          count: '1',
          sumTotalArea: '150',
        },
      ] as any);

      const result =
        await agriculturalPropertyService.dashboardPropertiesByCrop();

      expect(result).toEqual([
        {
          cropName: 'Mandioca',
          count: 1,
          sumTotalArea: 180,
        },
        {
          cropName: 'Milho',
          count: 1,
          sumTotalArea: 150,
        },
      ]);
    });
  });

  describe('dashboard land use', () => {
    it('should successfully find land use', async () => {
      repositoryMock.sum = jest
        .fn()
        .mockResolvedValueOnce(150)
        .mockResolvedValueOnce(330);

      const result = await agriculturalPropertyService.dashboardLandUse();

      expect(result).toEqual({
        sumVegetationArea: 150,
        sumArableArea: 330,
      });
    });

    it('should successfully find land use as 0, if values are nullable', async () => {
      repositoryMock.sum = jest
        .fn()
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);

      const result = await agriculturalPropertyService.dashboardLandUse();

      expect(result).toEqual({
        sumVegetationArea: 0,
        sumArableArea: 0,
      });
    });
  });
});
