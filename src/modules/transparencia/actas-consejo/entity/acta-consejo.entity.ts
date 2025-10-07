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

  @Column({ type: 'text', charset: 'utf8mb4', nullable: true })
  fileName: string;

  @Column({ type: 'datetime', nullable: true })
  fecha: Date;

  @Column({
    type: 'set',
    enum: SesionTipo,
    nullable: true,
  })
  sesion: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'simple-array', nullable: true })
  palabras_claves: string[];

  @Column({ type: 'text', nullable: true })
  documento: string;

  @Column({ type: 'text', nullable: true })
  video: string;

  @ManyToOne(() => User, (user) => user.actas)
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @Column({ type: 'int', nullable: true })
  usuario_id: number;

  @Column({ type: 'int', nullable: true })
  last_updated_by: number;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
