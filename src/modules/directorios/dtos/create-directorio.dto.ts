import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDirectorioDto {
  @IsString()
  unidad: string;

  @IsString()
  cargo: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  carreraId: number;
}
