import { PartialType } from "@nestjs/swagger";
import { CreateFileRelatedMorphDto } from './create-file-related-morph.dto';

export class EditFileRelatedMorphDto extends PartialType(CreateFileRelatedMorphDto) {}
