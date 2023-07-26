import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
export class CreateDirigidoDto {

    @ApiProperty({
        description: 'Nombre/titulo de dirigido',
    })
    @Optional()
    nombre: string;
    
    @ApiProperty({
        description: 'Para SEO',
    })
    @Optional()
    slug: string;
}
