import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { GetCarDto } from './dto/get-car.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  public async create(createCarDto: CreateCarDto): Promise<Car> {
    return await this.carRepository.save(createCarDto);
  }

  public async findAll(
    query: GetCarDto,
  ): Promise<{ result: Car[]; count: number }> {
    const { limit, offset } = query;
    const [result, count] = await this.carRepository.findAndCount({
      order: { createdAt: 'DESC' } as FindOptionsOrder<Car>,
      skip: offset,
      take: limit,
    });
    return {
      result,
      count,
    };
  }

  public async findOne(id: number): Promise<Car> {
    const result: Car | null = await this.carRepository.findOne({
      where: { id } as FindOptionsWhere<Car>,
    });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  public async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const carDetail: Car | null = await this.carRepository.findOne({
      where: { id } as FindOptionsWhere<Car>,
    });
    if (!carDetail) {
      throw new NotFoundException();
    }
    await this.carRepository.update(id, updateCarDto);

    const updatedCar: Car | null = await this.carRepository.findOne({
      where: { id } as FindOptionsWhere<Car>,
    });

    if (!updatedCar) {
      throw new NotFoundException();
    }

    return updatedCar;
  }

  public async remove(id: number): Promise<Boolean> {
    const carDetail: Car | null = await this.carRepository.findOne({
      where: { id } as FindOptionsWhere<Car>,
    });
    if (!carDetail) {
      throw new NotFoundException();
    }
    try {
      await this.carRepository.softDelete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
