import { ApiProperty } from '@nestjs/swagger';
import { Car } from '../entities/car.entity';

export class CarDetailResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  model: string;

  @ApiProperty()
  note: string;

  constructor(car: Car) {
    this.id = car.id;
    this.model = car.model;
    this.note = car.note;
  }
}
