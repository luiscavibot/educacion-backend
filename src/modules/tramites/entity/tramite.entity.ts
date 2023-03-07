import { Facultad } from '../../facultades/entity/facultad.entity';
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
import { TramiteTipo } from '../conts';
import { User } from '../../users/entities';

@Entity('tramites')
export class Tramite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  titulo!: string;

  
  @Column({ type: 'text' })
  descripcion: string;
  
  @Column({ type: 'text'})
  dirigido: string[];
  
  @Column({ type: 'datetime' })
  fecha: Date;

  @Column({ type: 'text' })
  requisitos: string;

  @Column({ type: 'text' })
  proceso: string;

  @Column({ type: 'text' })
  correo: string;

  @Column({ type: 'varchar', length: 5 })
  anexo: string;

  @ManyToOne(() => User, (user) => user.tramites)
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @Column({ type: 'int', nullable: false })
  usuario_id: number;

  @Column({ type: 'boolean' })
  estado: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
