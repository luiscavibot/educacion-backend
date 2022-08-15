import { IsOptional } from 'class-validator';

export class CreateActaConsejoDto {
  @IsOptional()
  fecha: Date;

  @IsOptional()
  sesion: string;

  @IsOptional()
  descripcion: string;

  @IsOptional()
  documento: string;

  @IsOptional()
  video: string;
}
