import { IsOptional } from "class-validator";

export class CreateProgramaDto {

    @IsOptional()
    nombre: string;

    @IsOptional()
    slug: string;

    @IsOptional()
    descripcion: string;

    @IsOptional()
    estado: boolean;

    @IsOptional()
    grado: string;

    @IsOptional()
    duracion: string;

    @IsOptional()
    perfil_ingresante: string;

    @IsOptional()
    perfil_egresado: string;

    @IsOptional()
    tipo: string;

    @IsOptional()
    foto: string;

    @IsOptional()
    creditos: number;
 
    @IsOptional()
    horario: string;

    @IsOptional()
    costo_total: string;

    @IsOptional()
    costo_semestre: string;

    @IsOptional()
    admision: string;

    @IsOptional()
    costo_credito: string;
    
    @IsOptional()
    vacante: number;

    @IsOptional()
    inicio_clase: string;

    @IsOptional()
    cierre_inscripcion: string;

    @IsOptional()
    modalidad: string;

    @IsOptional()
    plataforma: string;

    @IsOptional()
    lugar: string;

    @IsOptional()
    matricula: string;

    @IsOptional()
    correo: string;

    @IsOptional()
    brochure: string;

    @IsOptional()
    en_proceso: boolean;

    @IsOptional()
    porque_estudiar_con_nosotros: string;
    
    @IsOptional()
    campo_laboral: string;
  
    @IsOptional()
    facultadId: number;
}
