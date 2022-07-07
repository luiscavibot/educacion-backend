import { Facultad } from '../../facultades/entity/facultad.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('noticias')
export class Noticia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 200 })
  titulo!: string;

  @Column({ type: 'text' })
  subtitulo: string;

  @Column({ type: 'text' })
  cuerpo: string;

  @Column({ type: 'simple-array' })
  tags: string[];

  @ManyToOne(() => Facultad, (facultad) => facultad.noticias, { eager: true })
  @JoinColumn({ name: 'facultadId' })
  facultad: Facultad;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
