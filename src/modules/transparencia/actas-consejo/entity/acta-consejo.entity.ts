import { Facultad } from '../../../facultades/entity/facultad.entity';
import { User } from '../../../users/entities/user.entity';
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

  @Column({ type: 'text', charset: 'utf8mb4' })
  fileName: string;

  @Column({ type: 'datetime'  })
  fecha: Date;

  @Column({
    type: 'set',
    enum: SesionTipo,
  })
  sesion: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'simple-array' })
  palabras_claves: string[];

  @Column({ type: 'text' })
  documento: string;

  @Column({ type: 'text' })
  video: string;

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
