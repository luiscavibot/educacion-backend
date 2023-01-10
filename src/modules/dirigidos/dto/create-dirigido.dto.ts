import { Optional } from '@nestjs/common';
export class CreateDirigidoDto {

    @Optional()
    nombre: string;
  
    @Optional()
    slug: string;
}
