import { Carrera } from '../../carreras/entity/carrera.entity';
import { User } from '../../users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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
  electivo: boolean;

  @Column({ type: 'boolean' })
  estado: boolean;

  @ManyToOne(() => Carrera, (carrera) => carrera.asignaturas)
  @JoinColumn({ name: 'carreraId' })
  carrera: Carrera;

  @Column({ type: 'int' })
  carreraId: number;

  @ManyToOne(() => User, (user) => user.asignaturas)
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @Column({ type: 'int' })
  usuario_id: number;

  @Column({ type: 'int' })
  last_updated_by: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
