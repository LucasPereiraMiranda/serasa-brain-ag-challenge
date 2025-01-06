import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grower } from './grower.entity';
import { GrowerService } from './grower.service';
import { GrowerController } from './grower.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Grower])],
  controllers: [GrowerController],
  providers: [GrowerService],
  exports: [GrowerService],
})
export class GrowerModule {}
