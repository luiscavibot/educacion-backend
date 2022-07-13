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

@Entity('carreras')
export class Carrera {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  nombre!: string;

  @Column({ type: 'text', nullable: false })
  descripcion: string;

  @Column({ type: 'text', nullable: false })
  duracion: string;

  @Column({ type: 'text', nullable: false })
  objetivos: string;

  @Column({ type: 'text', nullable: false })
  perfil_ingresante: string;

  @Column({ type: 'text', nullable: false })
  perfil_graduado: string;

  @Column({ type: 'text', nullable: false })
  mision: string;

  @Column({ type: 'text', nullable: false })
  vision: string;

  @Column({ type: 'float', nullable: false })
  credito: number;

  @Column({ type: 'int', nullable: false })
  vacante: number;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  tipo: string;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  tipo_posgrado: string;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  tipo_maestria: string;

  @ManyToOne(() => Facultad, (facultad) => facultad.carreras, { eager: true })
  @JoinColumn({ name: 'facultadId' })
  facultad: Facultad;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
