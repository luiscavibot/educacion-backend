import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Carrera } from '../../carreras/entity/carrera.entity';
import { Asignatura } from '../../asignaturas/entity/asignatura.entity';

@Entity('asignaturas_carreras')
export class AsignaturaCarrera {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '10' })
  semestre: string;

  @Column({ type: 'text' })
  anio: string;

  @Column({ type: 'float' })
  credito: number;

  @Column({ type: 'boolean' })
  tipo: boolean;

  @ManyToOne(() => Carrera, (carrera) => carrera.asignatura_carrera)
  @JoinColumn({ name: 'carreraId' })
  carrera: Carrera;

  @Column({ type: 'int' })
  carreraId: number;

  @ManyToOne(() => Asignatura, (asignatura) => asignatura.asignatura_carrera)
  @JoinColumn({ name: 'asignaturaId' })
  asignatura: Carrera;

  @Column({ type: 'int' })
  asignaturaId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
