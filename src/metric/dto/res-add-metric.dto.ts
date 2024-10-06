import { ApiProperty } from '@nestjs/swagger';
import { Metric } from '../entities/metric.entity';
import {
  MetricDistanceUnit,
  MetricTemperatureUnit,
  MetricType,
} from 'src/constants/metric';

export class AddMetricResDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  unit: MetricDistanceUnit | MetricTemperatureUnit;

  @ApiProperty()
  type: MetricType;

  constructor(metric: Metric) {
    this.date = metric.date;
    this.value = metric.value;
    this.unit = metric.unit;
    this.type = metric.type;
  }
}
