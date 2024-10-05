import { ApiProperty } from '@nestjs/swagger';
import { Car } from '../entities/car.entity';
import { CarDetailResDto } from './get-car-detail.res.dto';

export class CarListResDto {
  @ApiProperty({ type: [CarDetailResDto] })
  cars: Array<CarDetailResDto>;

  @ApiProperty()
  total: number;

  constructor(cars: Array<Car>, total: number) {
    this.cars = cars;
    this.total = total;
  }
}
