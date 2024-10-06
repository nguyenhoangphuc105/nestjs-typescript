import { ApiProperty } from '@nestjs/swagger';
import { Metric } from '../entities/metric.entity';

export type MetricForChartResponse = {
  [key: string]: Metric; // Các key sẽ là string (ngày giờ)
};

export class MetricForChartResDto {
  chart: MetricForChartResponse;

  constructor(chart: MetricForChartResponse) {
    this.chart = chart;
  }
}
