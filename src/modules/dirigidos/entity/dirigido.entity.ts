import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity('dirigidos')
export class Dirigido{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  nombre!: string;

  @Column({ type: 'text' })
  slug: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
