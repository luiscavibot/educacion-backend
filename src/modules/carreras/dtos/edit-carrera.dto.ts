import { CreateCarreraDto } from '../../carreras/dtos/create-carrera.dto';
import { PartialType } from '@nestjs/swagger';
export class EditCarreraDto extends PartialType(CreateCarreraDto) {}
