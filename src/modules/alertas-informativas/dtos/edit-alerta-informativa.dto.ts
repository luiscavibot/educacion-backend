import { ApiProperty, OmitType } from "@nestjs/swagger";
import { CreateAlertaInformativaDto } from "./create-alerta-informativa.dto";
import { IsOptional, IsString } from "class-validator";

export class EditAlertaInformativaDto extends OmitType(CreateAlertaInformativaDto, [
    'usuario_id',
    'nombre'
] as const){

    @ApiProperty({
        description: 'Nombre de la Alerta informativa',
        nullable: true, // Marca como nullable para que sea opcional en Swagger
        minLength: 1
      })
    @IsString()
    @IsOptional()
    nombre?: string;
}
