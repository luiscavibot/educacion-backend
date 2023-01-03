import { Facultad } from '../../../facultades/entity/facultad.entity';
import { User } from '../../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('resoluciones_decanales')
export class ResolucionDecanal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'simple-array' })
  palabras_claves: string[];

  @Column({ type: 'text' })
  documento: string;

  @ManyToOne(() => Facultad, (facultad) => facultad.memorias)
  @JoinColumn({ name: 'facultadId' })
  facultad: Facultad;

  @Column({ type: 'text', charset: 'utf8mb4' })
  fileName: string;

  @Column({ type: 'int' })
  facultadId: number;

  @Column({type: 'timestamp'})
  fecha: Date;

  @Column({ type: 'boolean' })
  estado: boolean;

  @ManyToOne(() => User, (user) => user.resoluciones)
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