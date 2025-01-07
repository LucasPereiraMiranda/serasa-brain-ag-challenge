import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
  HealthCheckComponentDto,
  InvokeHealthCheckResponseDto,
} from './dto/response/invoke-health-check.response.dto';

@Injectable()
export class HealthCheckService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async invoke(): Promise<InvokeHealthCheckResponseDto> {
    const databaseCheck = await this.checkDatabaseConnection();

    return {
      uptime: process.uptime(),
      healthMessage: databaseCheck.status ? 'OK' : 'ERROR',
      checks: [databaseCheck],
    };
  }

  private async checkDatabaseConnection(): Promise<HealthCheckComponentDto> {
    try {
      await this.entityManager.query('SELECT 1');
      return {
        name: 'Database',
        status: true,
        details: 'Connected',
      };
    } catch (error) {
      return {
        name: 'Database',
        status: false,
        details: error?.message || 'Failed to connect',
      };
    }
  }
}
