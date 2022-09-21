import { Carrera } from '../../carreras/entity/carrera.entity';
import { AsignaturaCarrera } from '../../asignaturas-carreras/entity/asignatura-carrera.entity';
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

  @OneToMany(
    () => AsignaturaCarrera,
    (asignatura_carrera) => asignatura_carrera.asignatura,
  )
  asignatura_carrera: AsignaturaCarrera[];

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
