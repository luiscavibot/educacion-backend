import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Docente } from '../../docentes/entity/docente.entity';
import { Facultad } from '../../facultades/entity/facultad.entity';

@Entity('grupos_investigacion')
export class GrupoInvestigacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'text' })
  resolucion: string;

  @OneToOne(() => Docente, (docente) => docente.grupoInvestigacion, {
    eager: true,
  })
  @JoinColumn({ name: 'docenteId' })
  docente: Docente;

  @Column({ type: 'int', nullable: false })
  docenteId: number;

  @ManyToOne(() => Facultad, (facultad) => facultad.grupos_investigacion)
  @JoinColumn({ name: 'facultadId' })
  facultad: Facultad;

  @Column({ type: 'int', nullable: false })
  facultadId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
