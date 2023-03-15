import { OmitType } from "@nestjs/swagger";
import { CreateAlertaAdmisionPosgradoDto } from "./create-alerta-admision-posgrado.dto";

export class EditAlertaAdmisionPosgradoDto extends OmitType(CreateAlertaAdmisionPosgradoDto, [
    'usuario_id'
] as const) {}