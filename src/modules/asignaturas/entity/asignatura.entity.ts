import { Carrera } from '../../carreras/entity/carrera.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('asignaturas')
export class Asignatura extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: '10' })
  semestre: string;

  @Column({ type: 'text' })
  anio: string;

  @Column({ type: 'float' })
  credito: number;

  @Column({ type: 'boolean' })
  tipo: boolean;

  @ManyToOne(() => Carrera, (carrera) => carrera.asignaturas)
  @JoinColumn({ name: 'carreraId' })
  carrera: Carrera;

  @Column({ type: 'int' })
  carreraId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
