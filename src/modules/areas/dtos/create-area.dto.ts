import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAreaDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  nombre: string;
}
