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

@Entity('documentos-oficiales')
export class DocumentoOficial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', charset: 'utf8mb4' })
  nombre: string;

  @Column({ type:'text' })
  palabras_claves: string;

  @Column({ type: 'text' })
  anio: string;

  @Column({ type: 'text' })
  archivo: string;

  @Column({ type: 'text', charset: 'utf8mb4' })
  fileName: string;

  @Column({ type: 'boolean' })
  estado: boolean;

  @ManyToOne(() => User, (user) => user.documentos)
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @Column({ type: 'int' })
  usuario_id: number;

  @Column({ type: 'int' })
  last_updated_by: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
  
}
