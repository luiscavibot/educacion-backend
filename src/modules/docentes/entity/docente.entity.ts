import { CarreraDocente } from '../../carreras-docentes/entity/carrera-docente.entity';
import { GrupoInvestigacion } from '../../grupos-investigacion/entity/grupo-investigacion.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('docentes')
export class Docente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  nombre!: string;

  @Column({ type: 'simple-array' })
  correos: string[];

  @Column({ type: 'varchar' })
  foto: string;

  @Column({ type: 'varchar', length: 200 })
  grado: string;

  @Column({ type: 'text' })
  descripcion: string;

  @OneToMany(
    () => CarreraDocente,
    (carrera_docente) => carrera_docente.carreras,
  )
  carrera_docente: CarreraDocente[];

  @OneToOne(
    () => GrupoInvestigacion,
    (grupoInvestigacion) => grupoInvestigacion.docente,
  )
  grupoInvestigacion: GrupoInvestigacion;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
