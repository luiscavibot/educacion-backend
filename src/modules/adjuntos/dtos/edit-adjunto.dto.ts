import { PartialType } from "@nestjs/swagger";
import { CreateAdjuntoDto } from "./create-adjunto.dto";

export class EditAdjuntoDto extends PartialType(CreateAdjuntoDto) {}
