import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreatePregradoDto } from './create-pregrado.dto';
import { IsOptional } from 'class-validator';
export class EditPregradoDto  extends OmitType(CreatePregradoDto,[
    'usuarioId'
] as const){
    @ApiProperty({
        description: 'Id del usuario que creó la información académica de pregrado'
    })
    @IsOptional()
    usuarioId: number;
}
