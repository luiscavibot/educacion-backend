import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  nombre: string;

  @IsInt()
  @IsOptional()
  programas: number;
}
