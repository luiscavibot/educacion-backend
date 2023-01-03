import { Optional } from "@nestjs/common";
export class CreatePosgradoDto {

    @Optional()
    nombre: string;
    
    @Optional()
    tipo: string;
    
    @Optional()
    tipoPrograma: string;
    
    @Optional()
    nombrePrograma: string;
    
    @Optional()
    anio: string;
    
    @Optional()
    url: string;
    
    @Optional()
    estado: boolean;
    
    @Optional()
    fijado: boolean;
    
    @Optional()
    facultadId: number;
    
    @Optional()
    usuarioId: number;
    
    @Optional()
    last_updated_by: number;
}
