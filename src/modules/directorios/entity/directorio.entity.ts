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

@Entity('directorios')
export class Directorio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  unidad: string;

  @Column({ type: 'varchar', length: 150 })
  cargo: string;

  @Column({ type: 'text', nullable: false })
  nombre!: string;

  @Column({ type: 'simple-array' })
  anexo: string[];

  @Column({ type: 'simple-array' })
  correos: string[];

  @Column({ type: 'boolean' })
  estado: boolean;

  @ManyToOne(() => Facultad, (facultad) => facultad.directorios)
  @JoinColumn({ name: 'facultadId' })
  facultad: Facultad;

  @Column({ type: 'int', nullable: false })
  facultadId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
