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

@Entity('noticias')
export class Noticia extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 200 })
  titulo!: string;

  @Column({ type: 'text' })
  subtitulo: string;

  @Column({ type: 'text' })
  slug: string;

  @Column({ type: 'text' })
  foto: string;

  @Column({ type: 'text' })
  pie_foto: string;

  @Column({ type: 'text' })
  cuerpo: string;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column({ type: 'boolean' })
  destacado: boolean;

  @Column({ type: 'boolean' })
  estado: boolean;

  @Column({ type: 'text' })
  resumen: string;

  @ManyToOne(() => Facultad, (facultad) => facultad.noticias)
  @JoinColumn({ name: 'facultadId' })
  facultad: Facultad;

  @Column({ type: 'int' })
  facultadId: number;

  @ManyToOne(() => User, (user) => user.noticias)
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
