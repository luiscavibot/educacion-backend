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

@Entity('directorios')
export class Directorio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  unidad: string;

  @Column({ type: 'varchar', length: 150 })
  cargo: string;

  @Column({ type: 'text' })
  nombre!: string;

  @Column({ type: 'simple-array' })
  anexo: string[];

  @Column({ type: 'simple-array' })
  correos: string[];

  @Column({ type: 'int' })
  orden: number;

  @Column({ type: 'boolean' })
  estado: boolean;

  @ManyToOne(() => User, (user) => user.directorios)
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @Column({ type: 'int' })
  usuario_id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
