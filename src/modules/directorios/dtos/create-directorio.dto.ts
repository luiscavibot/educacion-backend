import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateDirectorioDto {

  @ApiProperty({
    description: 'Unidad al cual pertenece',
  })
  @IsOptional()
  @IsString()
  unidad: string;

  @ApiProperty({
    description: 'Cargo al cual pertenece',
  })
  @IsOptional()
  @IsString()
  cargo: string;


  @ApiProperty({
    description: 'Nombre de la persona/cargo',
  })
  @IsOptional()
  @IsString()
  nombre: string;
  
  @ApiProperty({
    description: 'Anexo para contactar',
  })
  @IsOptional()
  anexo: string[];
  
  @ApiProperty({
    description: 'Correos de contacto',
  })
  @IsOptional()
  correos: string[];

  @ApiProperty({
    description: 'Campo condicional si esta publico o no',
  })
  @IsOptional()
  estado: boolean;

  @ApiProperty({
    description: 'Id de la carrera',
  })
  @IsOptional()
  carreraId: number;

  @ApiProperty({
    description: 'Orden de como se mostrará',
  })
  @IsOptional()
  orden: number;
}
