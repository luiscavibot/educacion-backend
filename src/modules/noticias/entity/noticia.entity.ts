import { Adjunto } from 'src/modules/adjuntos/entity';
import { Facultad } from '../../facultades/entity/facultad.entity';
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

@Entity('noticias')
export class Noticia extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 200 })
  titulo: string;

  @Column({
    type: 'varchar',
    default: 'GENERAL',
  })
  target_project: string;

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

  @OneToMany(() => Adjunto, (adjunto) => adjunto.noticia)
  adjuntos: Adjunto[];

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
