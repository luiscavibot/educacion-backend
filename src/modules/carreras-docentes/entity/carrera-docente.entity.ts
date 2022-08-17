import { Carrera } from '../../carreras/entity/carrera.entity';
import { Docente } from '../../docentes/entity/docente.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('carreras_docentes')
export class CarreraDocente {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Carrera, (carrera) => carrera.carrera_docente)
  @JoinColumn({ name: 'carreraId' })
  carreras: Carrera;

  @Column({ type: 'int' })
  carreraId: number;

  @ManyToOne(() => Docente, (docente) => docente.carrera_docente, {
    eager: true,
  })
  @JoinColumn({ name: 'docenteId' })
  docentes: Docente;

  @Column({ type: 'int' })
  docenteId: number;

  @Column({ type: Boolean })
  director: boolean;

  @Column({ type: Boolean })
  coordinador: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
