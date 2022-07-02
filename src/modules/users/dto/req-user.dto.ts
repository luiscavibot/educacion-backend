import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReqUserDto {
  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  user: object;
}
