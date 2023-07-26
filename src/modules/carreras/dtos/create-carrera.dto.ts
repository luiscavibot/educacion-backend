import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCarreraDto {

  @ApiProperty({
    description: 'Nombre de la carrera',
    required: true,
    minLength:1
  })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Para SEO url de la carrera',
  })
  @IsOptional()
  @IsString()
  slug: string;


  @ApiProperty({
    description: 'Foto de la carrera',
  })
  @IsOptional()
  @IsString()
  foto: string;
  
  @IsOptional()
  @IsString()
  bluredFoto: string;

  @ApiProperty({
    description: 'Grado academico de la carrera',
    required: true,
    minLength:1
  })
  @IsOptional()
  @IsString()
  grado: string;

  @ApiProperty({
    description: 'Titulo de la carrera',
  })
  @IsOptional()
  @IsString()
  titulo: string;

  @ApiProperty({
    description: 'Objetivos de la carrera',
  })
  @IsOptional()
  @IsString()
  objetivos: string;

  @ApiProperty({
    description: 'Politica de proteccion de la carrera',
  })
  @IsOptional()
  @IsString()
  politicaProteccion: string;

  @ApiProperty({
    description: 'Años que dura la carrera',
  })
  @IsOptional()
  @IsString()
  duracion: string;

  @ApiProperty({
    description: 'Introduccion o descripcion de la carrera',
  })
  @IsOptional()
  @IsString()
  presentacion: string;

  @ApiProperty({
    description: 'Url de la pagina web de la carrera',
  })
  @IsOptional()
  @IsString()
  link_web: string;

  @ApiProperty({
    description: 'Correo de la carrera',
  })
  @IsOptional()
  @IsString()
  correo: string;

  @ApiProperty({
    description: 'Perfil ingresante de la carrera',
  })
  @IsOptional()
  @IsString()
  perfil_ingresante: string;

  @ApiProperty({
    description: 'Perfil graduado/egresado de la carrera',
  })
  @IsOptional()
  @IsString()
  perfil_graduado: string;

  @ApiProperty({
    description: 'Campo laboral de la carrera',
  })
  @IsOptional()
  @IsString()
  campo_laboral: string;

  @ApiProperty({
    description: 'Porque estudiar con nosotros de la carrera',
  })
  @IsOptional()
  @IsString()
  porQueEstudiarConNosotros: string;

  @ApiProperty({
    description: 'Cantidad de creditos de la carrera',
  })
  @IsOptional()
  @IsNumber()
  credito: number;

  @ApiProperty({
    description: 'Numero de vacantes de la carrera',
  })
  @IsOptional()
  @IsNumber()
  vacante: number;

  @ApiProperty({
    description: 'Nro de telefono de la carrera',
  })
  @IsOptional()
  @IsString()
  telefono: string;

  @ApiProperty({
    description: 'Direccion/ubicacion de la carrera',
  })
  @IsOptional()
  @IsString()
  direccion: string;
  

  @ApiProperty({
    description: 'Horario de la carrera',
  })
  @IsOptional()
  @IsString()
  horario: string;

  @ApiProperty({
    description: 'ID de la carrera',
  })
  @IsOptional()
  facultadId: number;

  @ApiProperty({
    description: 'Campo condicional para saber si la carrera esta en proceso de admision',
  })
  @IsOptional()
  en_proceso: boolean;

  @ApiProperty({
    description: 'Fecha de inicio de la carrera',
  })
  @IsOptional()
  fecha_inicio: string;

  @ApiProperty({
    description: 'Cierre de inscripciones para el admision de la carrera',
  })
  @IsOptional()
  cierre_inscripciones: string;
}
