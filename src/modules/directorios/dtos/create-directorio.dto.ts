import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDirectorioDto {
  @IsString()
  unidad: string;

  @IsString()
  cargo: string;

  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  carreraId: number;
}
