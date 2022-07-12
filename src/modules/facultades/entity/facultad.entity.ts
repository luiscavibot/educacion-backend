import { Area } from '../../areas/entity';
import { Noticia } from '../../noticias/entity/noticia.entity';
import { Carrera } from '../../carreras/entity/carrera.entity';
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

  @Column({ type: 'varchar', nullable: false, length: 300 })
  slug!: string;

  @OneToMany(() => Noticia, (noticia) => noticia.facultad)
  noticias: Noticia[];

  @OneToMany(() => Carrera, (carrera) => carrera.facultad)
  carreras: Carrera[];

  @ManyToOne(() => Area, (area) => area.facultades)
  @JoinColumn({ name: 'areaId' })
  area: Area;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}