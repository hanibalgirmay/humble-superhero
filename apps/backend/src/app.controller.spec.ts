import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateSuperheroDto } from './dto/create.superhero.dto';
import { BadRequestException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const mockSuperheroService = {
    getAllSuperheroes: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockSuperheroService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getAllSuperheroes', () => {
    it('should return an array of superheroes', async () => {
      const result = [
        { name: 'Thor', superpower: 'Tunder lighting', humilityScore: 10 },
      ];
      jest
        .spyOn(appService, 'getAllSuperheroes')
        .mockImplementation(async () => result);
      expect(await appController.getAllSuperheros()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new superhero with valid DTO is provided', async () => {
      const superhero: CreateSuperheroDto = {
        name: 'Thor',
        superpower: 'Tunder lighting',
        humilityScore: 10,
      };

      const expectedResponse = {
        message: 'Superhero created successfully',
        data: superhero,
      };

      jest
        .spyOn(appService, 'create')
        .mockImplementation(async () => expectedResponse);

      const response = await appController.createNewSuperhero(superhero);

      expect(response).toEqual(expectedResponse);

      expect(appService.create).toHaveBeenCalledWith(superhero);
    });

    it('should throw an error if the humility score is less than 1', async () => {
      const superheroDto: CreateSuperheroDto = {
        name: 'Iron Man',
        superpower: 'Genius',
        humilityScore: 0,
      };

      try {
        await appController.createNewSuperhero(superheroDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw an error if the humility score is greater than 10', async () => {
      const superheroDto: CreateSuperheroDto = {
        name: 'Iron Man',
        superpower: 'Genius-level intellect',
        humilityScore: 11,
      };
      try {
        await appController.createNewSuperhero(superheroDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw an error if the body content is missing', async () => {
      try {
        await appController.createNewSuperhero(undefined);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw an error if the body content is null', async () => {
      try {
        await appController.createNewSuperhero(null);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
