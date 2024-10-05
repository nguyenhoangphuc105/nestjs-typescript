import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { ApiResponse } from '@nestjs/swagger';
import { GetCarDto } from './dto/get-car.dto';
import { CreateCarResDto } from './dto/create-car.res.dto';
import { CarListResDto } from './dto/get-car.res.dto';
import { CarDetailResDto } from './dto/get-car-detail.res.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Car created successfully',
    type: CreateCarResDto,
  })
  public async create(
    @Body() createCarDto: CreateCarDto,
  ): Promise<CreateCarResDto> {
    const result: Car = await this.carService.create(createCarDto);
    return new CreateCarResDto(result);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of cars',
    type: CarListResDto,
  })
  public async findAll(@Query() query: GetCarDto): Promise<CarListResDto> {
    const { count, result } = await this.carService.findAll(query);
    return new CarListResDto(result, count);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Car found', type: CarDetailResDto })
  @ApiResponse({ status: 404, description: 'Car not found' })
  public async findOne(@Param('id') id: string): Promise<CarDetailResDto> {
    const result: Car = await this.carService.findOne(+id);
    return new CarDetailResDto(result);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Car updated successfully',
    type: CarDetailResDto,
  })
  @ApiResponse({ status: 404, description: 'Car not found' })
  public async update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<CarDetailResDto> {
    const result: Car = await this.carService.update(+id, updateCarDto);
    return new CarDetailResDto(result);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: Boolean,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async remove(@Param('id') id: string): Promise<Boolean> {
    return await this.carService.remove(+id);
  }
}
