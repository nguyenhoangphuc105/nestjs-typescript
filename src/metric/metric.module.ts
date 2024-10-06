import { Module } from '@nestjs/common';
import { MetricService } from './metric.service';
import { MetricController } from './metric.controller';
import { Metric } from './entities/metric.entity';
import { BaseEntity } from '../common/base.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Metric]), BaseEntity],
  controllers: [MetricController],
  providers: [MetricService],
})
export class MetricModule {}
