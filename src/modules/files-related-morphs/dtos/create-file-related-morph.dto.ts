import { Optional } from '@nestjs/common';
export class CreateFileRelatedMorphDto {

  @Optional()
  file_id: number;

  @Optional()
  related_id: number;
  
  @Optional()
  related_type: string;
  
  @Optional()
  order: number;

}
