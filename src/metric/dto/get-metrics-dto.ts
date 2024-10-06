import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import {
  MetricDistanceUnit,
  MetricTemperatureUnit,
  MetricType,
} from 'src/constants/metric';
import { IsValidMetricUnit } from 'src/decorator/is-valid-metric-unit';

export class GetMetricDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(MetricType)
  type: MetricType;

  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsValidMetricUnit()
  unit: MetricDistanceUnit | MetricTemperatureUnit;
}
