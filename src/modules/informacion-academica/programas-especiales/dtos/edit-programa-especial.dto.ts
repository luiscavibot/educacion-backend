import { OmitType } from '@nestjs/swagger';
import { CreateProgramaEspecialDto } from './create-programa-especial.dto';
export class EditProgramaEspecialDto extends OmitType(CreateProgramaEspecialDto, [
    'usuario_id'
] as const) {}
