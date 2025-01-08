import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { GrowerService } from '../grower.service';
import {
  MockRepository,
  repositoryMockFactory,
} from '../../common/tests/repository-mock';
import { Grower } from '../grower.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { growerCnpjMock, growerCpfMock } from './mocks/grower.mock';

describe('GrowerService', () => {
  let growerService: GrowerService;
  let repositoryMock: MockRepository<Repository<Grower>>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GrowerService,
        {
          provide: getRepositoryToken(Grower),
          useValue: repositoryMockFactory<Grower>(),
        },
      ],
    }).compile();

    growerService = module.get<GrowerService>(GrowerService);
    repositoryMock = module.get(getRepositoryToken(Grower));
  });

  beforeEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(growerService).toBeDefined();
  });

  describe('create grower', () => {
    it('should successfully create grower with cpf', async () => {
      repositoryMock.findOne = jest.fn().mockResolvedValue(undefined);
      repositoryMock.create = jest.fn().mockResolvedValue(growerCpfMock);

      const result = await growerService.create(growerCpfMock);

      expect(result).toEqual(growerCpfMock);
    });

    it('should successfully create grower with cnpj', async () => {
      repositoryMock.findOne = jest.fn().mockResolvedValue(undefined);
      repositoryMock.create = jest.fn().mockResolvedValue(growerCnpjMock);

      const result = await growerService.create(growerCnpjMock);

      expect(result).toEqual(growerCnpjMock);
    });

    it('should throw if cpf already exists', async () => {
      repositoryMock.findOne = jest.fn().mockResolvedValue(growerCpfMock);
      repositoryMock.create = jest.fn().mockResolvedValue(growerCpfMock);

      expect(growerService.create(growerCpfMock)).rejects.toThrow();
    });

    it('should throw if cnpj already exists', async () => {
      repositoryMock.findOne = jest.fn().mockResolvedValue(growerCnpjMock);
      repositoryMock.create = jest.fn().mockResolvedValue(growerCnpjMock);

      expect(growerService.create(growerCnpjMock)).rejects.toThrow();
    });

    it('should throw if cpf is invalid', async () => {
      const invalidCpf = '12037545458';
      repositoryMock.findOne = jest.fn().mockResolvedValue(undefined);
      repositoryMock.create = jest.fn().mockResolvedValue(growerCpfMock);

      expect(
        growerService.create({ ...growerCpfMock, document: invalidCpf }),
      ).rejects.toThrow();
    });

    it('should throw if cnpj is invalid', async () => {
      const invalidCnpj = '05278461000187';
      repositoryMock.findOne = jest.fn().mockResolvedValue(undefined);
      repositoryMock.create = jest.fn().mockResolvedValue(growerCpfMock);

      expect(
        growerService.create({ ...growerCpfMock, document: invalidCnpj }),
      ).rejects.toThrow();
    });
  });

  describe('find one by document', () => {
    it('should successfully find one grower by document', async () => {
      repositoryMock.findOne = jest.fn().mockResolvedValue(growerCpfMock);

      const result = await growerService.findOneByDocument(
        growerCpfMock.document,
      );

      expect(result).toEqual(growerCpfMock);
    });
  });

  describe('find one by id', () => {
    it('should successfully find one grower by id', async () => {
      repositoryMock.findOne = jest.fn().mockResolvedValue(growerCpfMock);

      const result = await growerService.findOneById('id');

      expect(result).toEqual(growerCpfMock);
    });

    it('should throw if grower not found by id', async () => {
      repositoryMock.findOne = jest.fn().mockResolvedValue(undefined);

      expect(growerService.findOneById('id')).rejects.toThrow();
    });
  });

  describe('update grower', () => {
    it('should successfully update existent grower', async () => {
      const newName = 'Lucas Miranda';
      repositoryMock.findOne = jest.fn().mockResolvedValue(growerCpfMock);
      repositoryMock.preload = jest.fn().mockResolvedValue(growerCpfMock);
      repositoryMock.save = jest
        .fn()
        .mockResolvedValue({ ...growerCpfMock, fullName: newName });
      const result = await growerService.update(
        { id: 'id' },
        {
          fullName: newName,
        },
      );

      expect(result).toEqual({ ...growerCpfMock, fullName: newName });
    });
  });

  describe('delete grower', () => {
    it('should successfully delete existent grower', async () => {
      repositoryMock.findOne = jest.fn().mockResolvedValue(growerCpfMock);
      repositoryMock.delete = jest.fn().mockResolvedValue({ affected: 1 });

      const result = await growerService.delete('id');

      expect(result).toEqual({ deleted: true });
    });
  });

  describe('find all growers', () => {
    it('should successfully find all growers', async () => {
      repositoryMock.find = jest
        .fn()
        .mockResolvedValue([growerCpfMock, growerCnpjMock]);
      repositoryMock.count = jest.fn().mockResolvedValue(2);

      const result = await growerService.findAll({ take: 10, skip: 0 });

      expect(result.data).toEqual([growerCpfMock, growerCnpjMock]);
      expect(result.count).toEqual(2);
    });
  });
});
