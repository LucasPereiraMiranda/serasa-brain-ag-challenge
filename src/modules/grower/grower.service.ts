import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grower } from './grower.entity';

@Injectable()
export class GrowerService {
  constructor(
    @InjectRepository(Grower)
    private growerRepository: Repository<Grower>,
  ) {}
}
