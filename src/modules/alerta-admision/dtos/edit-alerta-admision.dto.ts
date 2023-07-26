import { OmitType } from "@nestjs/swagger";
import { CreateAlertaAdmisionDto } from "./create-alerta-admision.dto";

export class EditAlertaAdmisionDto extends OmitType(CreateAlertaAdmisionDto, [
    'usuario_id',
    'nivelDeEstudio'
] as const) {

}