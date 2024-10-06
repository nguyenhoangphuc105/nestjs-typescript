import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MetricService } from './metric.service';
import { AddMetricDto } from './dto/add-metric.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Metric } from './entities/metric.entity';
import { AddMetricResDto } from './dto/res-add-metric.dto';
import { GetMetricDto } from './dto/get-metrics-dto';
import { MetricListResDto } from './dto/res-get-metric.dto';
import { GetMetricForChartDto } from './dto/get-metric-for-chart-dto';
import {
  MetricForChartResDto,
  MetricForChartResponse,
} from './dto/res-get-metric-for-chart.dto';

@Controller('metric')
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Metric added successfully',
    type: AddMetricResDto,
  })
  public async addMetric(
    @Body() addMetricDto: AddMetricDto,
  ): Promise<AddMetricResDto> {
    const result: Metric = await this.metricService.addMetric(addMetricDto);
    return new AddMetricResDto(result);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of metrics',
    type: MetricListResDto,
  })
  public async getMetrics(
    @Query() query: GetMetricDto,
  ): Promise<MetricListResDto> {
    const result: Metric[] = await this.metricService.getMetrics(query);
    return new MetricListResDto(result);
  }

  @Get('chart')
  @ApiResponse({
    status: 200,
    description: 'Metrics for chart',
    type: MetricForChartResDto,
  })
  public async getMetricForChart(
    @Query() query: GetMetricForChartDto,
  ): Promise<MetricForChartResDto> {
    const result: MetricForChartResponse =
      await this.metricService.getMetricForChart(query);
    return new MetricForChartResDto(result);
  }
}
