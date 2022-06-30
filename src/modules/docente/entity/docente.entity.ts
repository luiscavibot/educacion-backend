import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('docentes')
export class Docente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  nombre!: string;

  @Column({ type: 'varchar', length: 255 })
  correo: string;

  @Column({ type: 'varchar', length: 200 })
  grado: string;

  @Column({ type: 'text' })
  descripcion: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
