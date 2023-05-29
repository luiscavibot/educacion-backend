import { Optional } from '@nestjs/common';
export class CreateFileDto {

    @Optional()
    nombre: string;

    @Optional()
    originalname: string;

    @Optional()
    mimetype: string;

    @Optional()
    s3url: string;

    @Optional()
    width: number;

    @Optional()
    height: number;
}
