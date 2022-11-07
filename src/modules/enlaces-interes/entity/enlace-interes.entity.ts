import { User } from '../../users/entities/user.entity';
import { Carrera } from '../../carreras/entity/carrera.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('enlaces_interes')
export class EnlaceInteres {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text'})
  label: string;

  @Column({ type: 'text'})
  link: string;

  @ManyToOne(() => User, (user) => user.enlaces_interes)
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @ManyToOne(() => Carrera, (carrera) => carrera.enlaces_interes)
  @JoinColumn({ name: 'carrera_id' })
  carrera: Carrera;

  @Column({ type: 'int' })
  carrera_id: number;

  @Column({ type: 'int' })
  usuario_id: number;

  @Column({ type: 'int' })
  last_updated_by: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}