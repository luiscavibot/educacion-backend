import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMemoriaDto {
  @IsOptional()
  @IsString()
  nombre: string;

  @IsString()
  @IsArray()
  palabras_clave: string[];

  @IsString()
  @IsOptional()
  documento: string;

  @IsOptional()
  fileName: string;

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
