import { UserRole } from '../consts/UserRole';
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
  @IsOptional()
  correo: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  nombre: string;

  @IsInt()
  @IsOptional()
  proyecto: number;

  @IsOptional()
  roles: UserRole[];
}
