import { BadRequestException, Injectable } from '@nestjs/common';
import { Superhero } from './utils/interface/Superhero.interface';
import { CreateSuperheroDto } from './dto/create.superhero.dto';

@Injectable()
export class AppService {
  private superheros: Superhero[] = [];

  /**
   * @description Get all superheroes
   * @returns
   */
  async getAllSuperheroes() {
    return await this.superheros.sort(
      (a, b) => a.humilityScore - b.humilityScore,
    );
  }

  /**
   * @description create a new superhero
   * @param superhero
   * @returns
   */
  async create(superhero: CreateSuperheroDto) {
    if (superhero == null) {
      throw new BadRequestException('Body content cannot be null or undefined');
    }
    this.superheros.push(superhero);

    return {
      message: 'Superhero created successfully',
      data: superhero,
    };
  }
}
