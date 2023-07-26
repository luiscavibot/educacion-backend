import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAreaDto {

  @ApiProperty({
    description: 'Nombre del Área',
    required: true,
    minLength: 1
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  nombre: string;
}
