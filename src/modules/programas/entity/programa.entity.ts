import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Facultad } from '../../facultades/entity/facultad.entity';

@Entity('programas')
export class Programa extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    nombre: string;

    @Column({ type: 'boolean' })
    estado: boolean;

    @Column({ type: 'text' })
    foto: string;

    @Column({ type: 'text' })
    slug: string;

    @Column({ type: 'text' })
    descripcion: string;

    @Column({ type: 'text' })
    grado: string;

    @Column({ type: 'text' })
    duracion: string;

    @Column({ type: 'text' })
    perfil_ingresante: string;

    @Column({ type: 'text' })
    perfil_egresado: string;

    @Column({ type: 'text' })
    tipo: string;

    @Column({ type: 'float' })
    creditos: number;
 
    @Column({ type: 'text' })
    horario: string;

    @Column({ type: 'text' })
    costo_total: string;

    @Column({ type: 'text' })
    costo_semestre: string;

    @Column({ type: 'text' })
    admision: string;

    @Column({ type: 'text' })
    costo_credito: string;
    
    @Column({ type: 'int' })
    vacante: number;

    @Column({ type: 'text' })
    inicio_clase: string;

    @Column({ type: 'text' })
    cierre_inscripcion: string;

    @Column({ type: 'text' })
    modalidad: string;

    @Column({ type: 'text' })
    plataforma: string;

    @Column({ type: 'text' })
    lugar: string;

    @Column({ type: 'text' })
    matricula: string;

    @Column({ type: 'text' })
    correo: string;

    @Column({ type: 'text' })
    brochure: string;

    @Column({ type: 'boolean' })
    en_proceso: boolean;

    @Column({ type: 'text' })
    porque_estudiar_con_nosotros: string;
    
    @Column({ type: 'text' })
    campo_laboral: string;

    @ManyToOne(() => Facultad, (facultad) => facultad.programas)
    @JoinColumn({ name: 'facultadId' })
    facultad: Facultad;
  
    @Column({ type: 'int' })
    facultadId: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;
}
