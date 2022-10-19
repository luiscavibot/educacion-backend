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

@Entity('tramites')
export class Tramite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  titulo!: string;

  
  @Column({ type: 'text' })
  descripcion: string;
  
  @Column({ type: 'set', enum: TramiteTipo })
  dirigido: TramiteTipo[];
  
  @Column({ type: 'datetime' })
  fecha: Date;

  @Column({ type: 'text' })
  requisitos: string;

  @Column({ type: 'text' })
  proceso: string;

  @Column({ type: 'text' })
  correo: string;

  @Column({ type: 'text' })
  telefono: string;

  @ManyToOne(() => Facultad, (facultad) => facultad.tramites)
  @JoinColumn({ name: 'facultadId' })
  facultad: Facultad;

  @Column({ type: 'int', nullable: false })
  facultadId: number;

  @Column({ type: 'boolean' })
  estado: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
