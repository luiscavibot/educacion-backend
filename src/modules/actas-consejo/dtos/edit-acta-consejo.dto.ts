import { CreateActaConsejoDto } from './create-acta-consejo.dto';
import { PartialType } from '@nestjs/swagger';
export class EditActaConsejoDto extends PartialType(CreateActaConsejoDto) {}
