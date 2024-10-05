import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { Car } from './entities/car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEntity } from '../common/base.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), BaseEntity],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
