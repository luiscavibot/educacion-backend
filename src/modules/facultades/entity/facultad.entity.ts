import { Area } from '../../areas/entity';
import { Noticia } from '../../noticias/entity/noticia.entity';
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

@Entity('facultades')
export class Facultad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 300 })
  nombre!: string;

  @OneToMany(() => Noticia, (noticia) => noticia.facultad)
  noticias: Noticia[];

  @ManyToOne(() => Area, (area) => area.facultades, { eager: true })
  @JoinColumn({ name: 'areaId' })
  area: Area;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
