import { PartialType } from '@nestjs/swagger';
import { CreateComunicadosDto } from './create-comunicados.dto';
export class EditComunicadosDto extends PartialType(CreateComunicadosDto){}
