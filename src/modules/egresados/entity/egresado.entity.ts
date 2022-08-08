import { Facultad } from '../../facultades/entity/facultad.entity';
import { Carrera } from '../../carreras/entity/carrera.entity';
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

@Entity('egresados')
export class Egresado extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  nombre!: string;

  @Column({ type: 'text', nullable: false })
  grado: string;

  @Column({ type: 'text', nullable: false })
  cargo: string;

  @Column({ type: 'text', nullable: false })
  foto: string;

  @Column({ type: 'text', nullable: false })
  frase: string;

  @Column({ type: 'text' })
  url_twitter: string;

  @Column({ type: 'text' })
  url_facebook: string;

  @Column({ type: 'text' })
  url_linkedin: string;

  @ManyToOne(() => Carrera, (carrera) => carrera.egresados)
  @JoinColumn({ name: 'carreraId' })
  carrera: Carrera;

  @Column({ type: 'int', nullable: false })
  carreraId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
