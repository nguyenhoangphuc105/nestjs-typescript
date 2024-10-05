import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from './car.service';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CarService', () => {
  let service: CarService;
  let carRepository: Repository<Car>;

  const mockCarRepository = {
    save: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarService,
        {
          provide: getRepositoryToken(Car),
          useValue: mockCarRepository,
        },
      ],
    }).compile();

    service = module.get<CarService>(CarService);
    carRepository = module.get<Repository<Car>>(getRepositoryToken(Car));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
