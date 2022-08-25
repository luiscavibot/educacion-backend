import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateEventoDto } from './create-evento.dto';
export class EditEventoDto extends PartialType(CreateEventoDto) {
  @IsOptional()
  facultadId: number;

  @IsOptional()
  usuario_id: number;
}
