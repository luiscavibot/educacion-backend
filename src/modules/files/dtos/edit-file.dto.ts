import { PartialType } from '@nestjs/swagger';
import { CreateFileDto } from './create-file.dto';
export class EditFileDto extends PartialType(CreateFileDto){}
