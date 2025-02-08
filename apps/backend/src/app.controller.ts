import { BadRequestException, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Body } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create.superhero.dto';
import { Superhero } from './utils/interface/Superhero.interface';

@Controller('superheroes')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllSuperheros() {
    return this.appService.getAllSuperheroes();
  }

  @Post()
  async createNewSuperhero(@Body() superheroDto: CreateSuperheroDto): Promise<{
    message: string;
    data: Superhero;
  }> {
    return await this.appService.create(superheroDto);
    // try {
    // } catch (error) {
    //   if (error instanceof BadRequestException) {
    //     throw new BadRequestException(error.message);
    //   }

    //   throw error;
    // }
  }
}
