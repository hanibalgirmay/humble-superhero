import { IsString, IsNotEmpty, IsNumber, Min, Max, IsInt } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  superpower: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'Humility score must be at least 1' })
  @Max(10, { message: 'Humility score must be at most 10' })
  humilityScore: number;
}
