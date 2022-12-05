import { PartialType } from '@nestjs/swagger';
import { CreatePregradoDto } from './create-pregrado.dto';
export class EditPregradoDto  extends PartialType(CreatePregradoDto){}
