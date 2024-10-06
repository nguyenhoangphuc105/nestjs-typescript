import { BaseEntity } from 'src/common/base.entity';
import {
  MetricDistanceUnit,
  MetricTemperatureUnit,
  MetricType,
} from 'src/constants/metric';
import { Column, Entity } from 'typeorm';

@Entity('metrics')
export class Metric extends BaseEntity {
  @Column()
  userId: string;

  @Column()
  date: string;

  @Column()
  value: number;

  @Column()
  unit: MetricDistanceUnit | MetricTemperatureUnit;

  @Column()
  type: MetricType;
}
