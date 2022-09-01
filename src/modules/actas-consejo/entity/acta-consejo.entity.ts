import { Facultad } from '../../facultades/entity/facultad.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SesionTipo } from '../consts';

@Entity('actas_consejo')
export class ActaConsejo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column({
    type: 'set',
    enum: SesionTipo,
  })
  sesion: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'text' })
  documento: string;

  @Column({ type: 'text' })
  video: string;

  @ManyToOne(() => Facultad, (facultad) => facultad.actas)
  @JoinColumn({ name: 'facultadId' })
  facultad: Facultad;

  @Column({ type: 'int' })
  facultadId: number;

  @ManyToOne(() => User, (user) => user.actas)
  @JoinColumn({ name: 'usuario_id' })
  user: User;

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
