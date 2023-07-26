import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAsignaturaDto {

  @ApiProperty({
    description: 'Nombre de la asignatura',
    required: true,
    minLength:1
  })
  @IsNotEmpty()
  @IsOptional()
  nombre: string;

  @ApiProperty({
    description: 'Semestre de una asignatura'
  })
  @IsOptional()
  semestre: string;
  
  @ApiProperty({
    description: 'Campo para saber si una asignatura esta publicada o no lo esta'
  })
  @IsOptional()
  estado: boolean;
  
  @ApiProperty({
    description: 'Año al cual pertence la asignatura 1er año o 2do año'
  })
  @IsOptional()
  anio: string;

  @ApiProperty({
    description: 'Credito de una asignatura'
  })
  @IsOptional()
  credito: number;


  @ApiProperty({
    description: 'Campo para identificar si una asignatura es electivo o no'
  })
  @IsOptional()
  electivo: boolean;
  
  @ApiProperty({
    description: 'Id de la carrera al cual pertenece la asignatura'
  })
  @IsNotEmpty()
  carreraId: number;
  
  @ApiProperty({
    description: 'Id del usuario que crea la asignatura'
  })
  @IsNotEmpty()
  usuario_id: number;
}
