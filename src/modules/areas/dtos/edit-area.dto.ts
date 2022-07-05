import { PartialType } from '@nestjs/swagger';
import { CreateAreaDto } from './create-area.dto';

export class EditAreaDto extends PartialType(CreateAreaDto) {}
