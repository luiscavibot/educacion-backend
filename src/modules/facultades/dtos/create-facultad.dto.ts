import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFacultadDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  nombre!: string;

  @IsNotEmpty()
  @IsNumber()
  areaId!: number;

  @IsOptional()
  frontendDomain: string;
  
  @IsOptional()
  slug: string;

}
