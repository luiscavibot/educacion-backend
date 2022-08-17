import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../consts';
import { Facultad } from '../../facultades/entity';
import { Noticia } from '../../noticias/entity';

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

  @ManyToOne(() => Facultad, (facultad) => facultad.users, { eager: true })
  @JoinColumn({ name: 'proyecto' })
  facultad: Facultad;

  @OneToMany(() => Noticia, (noticia) => noticia.user)
  noticias: Noticia[];

  @Column({ type: 'int', nullable: true })
  proyecto: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
