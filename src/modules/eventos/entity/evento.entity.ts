import { User } from '../../users/entities/user.entity';
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
import { EventoTipo } from '../consts';

@Entity('eventos')
export class Evento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  titulo!: string;

  @Column({
    type: 'text',
  })
  tipo_evento: string;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  lugar: string;

  @Column({ type: 'text' })
  foto: string;

  @Column({ type: 'text' })
  adjuntos: string;

  @Column({ type: 'text' })
  calendario: string;

  @Column({ type: 'text' })
  organizador: string;

  @Column({ type: 'timestamp' })
  fecha_inicio: Date;

  @Column({ type: 'timestamp' })
  fecha_final: Date;

  @Column({ type: 'text' })
  cuerpo: string;

  @Column({ type: 'simple-array' })
  tags: string[];

  @ManyToOne(() => User, (user) => user.eventos)
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @Column({ type: 'text' })
  slug: string;

  @Column({ type: 'int' })
  usuario_id: number;

  @Column({ type: 'int' })
  last_updated_by: number;

  @Column({ type: 'boolean' })
  estado: boolean;
  
  @Column({ type: 'boolean', default: false })
  destacado: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}