import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

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

describe('AgriculturalPropertyService', () => {
  let agriculturalPropertyService: AgriculturalPropertyService;
  let growerService: GrowerService;
  let repositoryMock: MockRepository<Repository<AgriculturalProperty>>;

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
    growerService = module.get<GrowerService>(GrowerService);
    repositoryMock = module.get(getRepositoryToken(AgriculturalProperty));
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
});
