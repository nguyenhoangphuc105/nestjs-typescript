import { ApiProperty } from '@nestjs/swagger';
import { Metric } from '../entities/metric.entity';
export class MetricListResDto {
  @ApiProperty({ type: [Metric] })
  metrics: Metric[];

  constructor(metrics: Metric[]) {
    this.metrics = metrics;
  }
}
