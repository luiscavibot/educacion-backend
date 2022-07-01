import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../consts';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  correo: string;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  password: string;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  nombre: string;

  @Column({
    type: 'set',
    enum: UserRole,
    default: [UserRole.ADMIN],
  })
  roles: UserRole[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
