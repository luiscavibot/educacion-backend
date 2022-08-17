import { CarreraDocente } from '../../carreras-docentes/entity/carrera-docente.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('docentes')
export class Docente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  nombre!: string;

  @Column({ type: 'varchar', length: 255 })
  correo: string;

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

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
