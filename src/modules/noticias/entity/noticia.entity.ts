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

  @Column({ type: 'simple-array' })
  tags: string[];

  @Column({ type: 'boolean' })
  destacado: boolean;

  @Column({ type: 'boolean' })
  estado: boolean;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @ManyToOne(() => Facultad, (facultad) => facultad.noticias, { eager: true })
  @JoinColumn({ name: 'facultadId' })
  facultad: Facultad;

  @Column({ type: 'int' })
  facultadId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
