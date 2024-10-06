import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import moment from 'moment';
import {
  MetricDistanceUnit,
  MetricTemperatureUnit,
  MetricType,
} from 'src/constants/metric';
import { IsValidMetricUnit } from 'src/decorator/is-valid-metric-unit';

export class AddMetricDto {
  @ApiProperty({ default: moment() })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsValidMetricUnit()
  unit: MetricDistanceUnit | MetricTemperatureUnit;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(MetricType)
  type: MetricType;

  @ApiProperty()
  @IsNotEmpty()
  userId: string;
}
