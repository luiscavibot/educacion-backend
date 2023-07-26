import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFacultadDto {

  @ApiProperty({
    description: 'nombre de la facultad',
    required: true,
    minLength: 1
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  nombre!: string;

  @ApiProperty({
    description: 'Id del area al cual pertenece la facultad',
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  areaId!: number;
  
  @ApiProperty({
    description: 'Dominio de la pagina web de la facultad'
  })
  @IsOptional()
  frontendDomain: string;
  
  @ApiProperty({
    description: 'Campo para SEO de la facultad'
  })
  @IsOptional()
  slug: string;

}
