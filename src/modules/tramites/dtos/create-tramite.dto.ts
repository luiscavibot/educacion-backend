import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTramiteDto {
  @ApiProperty({
    description: 'Título del trámite',
  })
  @IsOptional()
  @IsString()
  titulo!: string;

  @IsOptional()
  @IsString()
  target_project: string;

  @ApiProperty({
    description: 'A quienes va dirigido el trámite',
  })
  @IsOptional()
  dirigido: string[];

  @ApiProperty({
    description: 'Descripcion del trámite',
  })
  @IsOptional()
  @IsString()
  descripcion: string;

  @ApiProperty({
    description: 'Fecha del trámite',
  })
  @IsOptional()
  fecha: Date;

  @ApiProperty({
    description: 'Requisitos del trámite',
  })
  @IsOptional()
  @IsString()
  requisitos: string;

  @ApiProperty({
    description: 'Proceso del trámite',
  })
  @IsOptional()
  @IsString()
  proceso: string;

  @ApiProperty({
    description: 'Correo del trámite',
  })
  @IsOptional()
  @IsString()
  correo: string;

  @ApiProperty({
    description: 'Anexo del trámite',
  })
  @IsOptional()
  @IsString()
  anexo: string;

  @ApiProperty({
    description: 'Campo para publicar o despublicar del trámite',
  })
  @IsOptional()
  estado: boolean;

  @ApiProperty({
    description: 'Fijar en la pagina web el trámite',
  })
  @IsOptional()
  @IsBoolean()
  fijar: boolean;

  @ApiProperty({
    description: 'ID del usuario creador del trámite',
  })
  @IsNotEmpty()
  usuario_id: number;
}
