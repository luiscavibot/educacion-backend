import { Area } from '../../areas/entity';
import { Noticia } from '../../noticias/entity';
import { Carrera } from '../../carreras/entity';
import { Evento } from '../../eventos/entity';
import { Egresado } from '../../egresados/entity';
import { User } from '../../users/entities/user.entity';
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

  @OneToMany(() => Evento, (evento) => evento.facultad)
  eventos: Evento[];

  @OneToMany(() => Carrera, (carrera) => carrera.facultad)
  carreras: Carrera[];

  @OneToMany(() => Egresado, (egresado) => egresado.facultad)
  egresados: Egresado[];

  @OneToMany(() => User, (user) => user.facultad)
  users: User[];

  @ManyToOne(() => Area, (area) => area.facultades)
  @JoinColumn({ name: 'areaId' })
  area: Area;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
