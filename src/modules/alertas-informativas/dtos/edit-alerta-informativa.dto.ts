import { OmitType } from "@nestjs/swagger";
import { CreateAlertaInformativaDto } from "./create-alerta-informativa.dto";

export class EditAlertaInformativaDto extends OmitType(CreateAlertaInformativaDto, [
    'usuario_id'
] as const){}
