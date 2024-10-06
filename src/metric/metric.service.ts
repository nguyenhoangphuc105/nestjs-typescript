import { Injectable } from '@nestjs/common';
import { AddMetricDto } from './dto/add-metric.dto';
import { Metric } from './entities/metric.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { GetMetricDto } from './dto/get-metrics-dto';
import { GetMetricForChartDto } from './dto/get-metric-for-chart-dto';
import moment from 'moment';
import { MetricForChartResponse } from './dto/res-get-metric-for-chart.dto';
import {
  MetricDistanceUnit,
  MetricTemperatureUnit,
  MetricType,
} from 'src/constants/metric';
import { convertDistance, convertTemperature } from 'src/util/metric';

@Injectable()
export class MetricService {
  constructor(
    @InjectRepository(Metric)
    private readonly metricRepository: Repository<Metric>,
  ) {}

  /**
   * Add metric
   * @param addMetricDto AddMetricDto
   * @returns Metric
   */
  public async addMetric(addMetricDto: AddMetricDto): Promise<Metric> {
    return await this.metricRepository.save(addMetricDto);
  }

  /**
   * Get metrics
   * @param query GetMetricDto
   * @returns Metric[]
   */
  public async getMetrics(query: GetMetricDto): Promise<Metric[]> {
    const { type, userId, unit } = query;
    const metrics: Metric[] = await this.metricRepository.find({
      where: { type, userId },
      order: {
        date: 'DESC',
      },
    });
    if (!unit) {
      return metrics;
    }

    // Convert unit
    for (let index = 0; index < metrics.length; index++) {
      const metric = metrics[index];
      switch (metric.type) {
        case MetricType.DISTANCE:
          metric.value = convertDistance(
            metric.value,
            metric.unit as MetricDistanceUnit,
            unit as MetricDistanceUnit,
          );
          break;
        case MetricType.TEMPERATURE:
          metric.value = convertTemperature(
            metric.value,
            metric.unit as MetricTemperatureUnit,
            unit as MetricTemperatureUnit,
          );
          break;
        default:
          break;
      }
      metric.unit = unit;
    }
    return metrics;
  }

  /**
   * Get metric for chart
   * @param query GetMetricForChartDto
   * @returns MetricForChartResponse
   */
  public async getMetricForChart(
    query: GetMetricForChartDto,
  ): Promise<MetricForChartResponse> {
    const { subtractMonth: period, type, userId, unit } = query;
    const fromDate: string = moment()
      .subtract(period, 'M')
      .startOf('month')
      .toISOString();
    const toDate: string = moment().endOf('day').toISOString();

    // Get metric by from to
    const metrics: Metric[] = await this.metricRepository.find({
      where: { userId, type, date: Between(fromDate, toDate) },
      order: { id: 'DESC' },
    });

    const chart = {} as MetricForChartResponse;

    // Get lastest metric by date desc and convert unit
    for (let index = 0; index < metrics.length; index++) {
      const metric: Metric = metrics[index];
      const date: string = metric.date.split('T')[0];
      if (!chart[date]) {
        if (unit) {
          switch (metric.type) {
            case MetricType.DISTANCE:
              metric.value = convertDistance(
                metric.value,
                metric.unit as MetricDistanceUnit,
                unit as MetricDistanceUnit,
              );
              break;
            case MetricType.TEMPERATURE:
              metric.value = convertTemperature(
                metric.value,
                metric.unit as MetricTemperatureUnit,
                unit as MetricTemperatureUnit,
              );
              break;
            default:
              break;
          }
          metric.unit = unit;
        }
        chart[date] = metric;
      }
    }
    return chart;
  }
}
