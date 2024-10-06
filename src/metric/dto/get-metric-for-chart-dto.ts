import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import {
  MetricDistanceUnit,
  MetricTemperatureUnit,
  MetricType,
} from 'src/constants/metric';
import { IsValidMetricUnit } from 'src/decorator/is-valid-metric-unit';

export class GetMetricForChartDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(MetricType)
  type: MetricType;

  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    default: 0,
    description: 'Number of months to subtract from current month',
  })
  @IsNotEmpty()
  @IsNumberString()
  subtractMonth: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsValidMetricUnit()
  unit: MetricDistanceUnit | MetricTemperatureUnit;
}
