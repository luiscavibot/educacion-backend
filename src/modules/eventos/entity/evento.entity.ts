import { Facultad } from '../../facultades/entity/facultad.entity';
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

@Entity('eventos')
export class Evento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  titulo!: string;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  tipo_evento: string;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  lugar: string;

  @Column({ type: 'text' })
  foto: string;

  @Column({ type: 'timestamp' })
  fecha_inicio: Date;

  @Column({ type: 'timestamp' })
  fecha_final: Date;

  @Column({ type: 'text' })
  cuerpo: string;

  @Column({ type: 'simple-array' })
  tags: string[];

  @ManyToOne(() => Facultad, (facultad) => facultad.eventos, { eager: true })
  @JoinColumn({ name: 'facultadId' })
  facultad: Facultad;

  @Column({ type: 'int' })
  facultadId: number;

  @ManyToOne(() => User, (user) => user.eventos, { eager: true })
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

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
