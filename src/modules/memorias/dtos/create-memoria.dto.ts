import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMemoriaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsString()
  @IsOptional()
  documento: string;

  @IsOptional()
  @IsNumber()
  facultadId: number;

  @IsDate()
  @IsOptional()
  fecha: Date;

  @IsBoolean()
  @IsOptional()
  estado: boolean;

  @IsNumber()
  @IsOptional()
  usuario_id: number;

  @IsNumber()
  @IsOptional()
  last_updated_by: number;
}
