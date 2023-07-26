import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateCarreraDocenteDto {

  @ApiProperty({
    description: 'Id de carrera'
  })
  @IsOptional()
  carreraId: number;

  @ApiProperty({
    description: 'Id del docente'
  })
  @IsOptional()
  docenteId: number;

  @ApiProperty({
    description: 'Campo condicional si es director el docente'
  })
  @IsOptional()
  director: boolean;

  @ApiProperty({
    description: 'Campo condicional si es coordinador el docente'
  })
  @IsOptional()
  coordinador: boolean;
}
