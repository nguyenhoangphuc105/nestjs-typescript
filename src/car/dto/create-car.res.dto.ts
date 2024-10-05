import { ApiProperty } from '@nestjs/swagger';
import { Car } from '../entities/car.entity';

export class CreateCarResDto {
  @ApiProperty()
  model: string;

  @ApiProperty()
  note: string;

  constructor(car: Car) {
    this.model = car.model;
    this.note = car.note;
  }
}
