import { Module } from '@nestjs/common';
import { ormConfig } from './orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrowerModule } from './modules/grower/grower.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), GrowerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
