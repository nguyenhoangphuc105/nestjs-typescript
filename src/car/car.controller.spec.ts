import { Test, TestingModule } from '@nestjs/testing';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';

describe('CarController', () => {
  let controller: CarController;
  let service: CarService;

  const mockCarRepository = {
    save: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  const mockCarService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarController],
      providers: [
        CarService,
        {
          provide: getRepositoryToken(Car),
          useValue: mockCarRepository,
        },
        {
          provide: CarService,
          useValue: mockCarService,
        },
      ],
    }).compile();

    controller = module.get<CarController>(CarController);
    service = module.get<CarService>(CarService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
