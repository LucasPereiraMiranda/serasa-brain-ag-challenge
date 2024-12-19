import { Module } from '@nestjs/common';
import { ormConfig } from './configs/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
