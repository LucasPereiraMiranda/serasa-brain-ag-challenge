import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { GrowerService } from './grower.service';

@Controller('grower')
export class GrowerController {
  constructor(private growerService: GrowerService) {}

  @Post()
  async create() {
    return;
  }

  @Patch()
  async update() {
    return;
  }

  @Get()
  async getOne() {
    return;
  }

  @Delete()
  async delete() {
    return;
  }
}
