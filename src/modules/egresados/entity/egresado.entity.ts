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

  @Column({ type: 'text', nullable: false })
  url_twitter: string;

  @Column({ type: 'text', nullable: false })
  url_facebook: string;

  @Column({ type: 'text', nullable: false })
  url_linkedin: string;

  @ManyToOne(() => Facultad, (facultad) => facultad.egresados, { eager: true })
  @JoinColumn({ name: 'facultadId' })
  facultad: Facultad;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
