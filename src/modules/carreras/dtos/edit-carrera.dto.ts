import { PartialType } from '@nestjs/swagger';
import { CreateCarreraDto } from '../../carreras/dtos/create-carrera.dto';
export class EditCarreraDto extends PartialType(CreateCarreraDto) {}
