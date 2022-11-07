import { Facultad } from '../../facultades/entity/facultad.entity';
import { CarreraDocente } from '../../carreras-docentes/entity/carrera-docente.entity';
import { Egresado } from '../../egresados/entity/egresado.entity';
import { Asignatura } from '../../asignaturas/entity/asignatura.entity';
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

@Entity('carreras')
export class Carrera {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  nombre!: string;

  @Column({ type: 'text', nullable: false })
  slug: string;

  @Column({ type: 'text', nullable: false })
  foto: string;

  @Column({ type: 'text', nullable: false })
  telefono: string;

  @Column({ type: 'text', nullable: false })
  direccion: string;

  @Column({ type: 'text', nullable: false })
  horario: string;

  @Column({ type: 'text', nullable: false })
  bluredFoto: string;

  @Column({ type: 'text', nullable: false })
  grado: string;

  @Column({ type: 'text', nullable: false })
  titulo: string;

  @Column({ type: 'text', nullable: false })
  duracion: string;

  @Column({ type: 'text', nullable: false })
  link_web: string;

  @Column({ type: 'text', nullable: false })
  correo: string;

  @Column({ type: 'text', nullable: false })
  presentacion: string;

  @Column({ type: 'text', nullable: false })
  perfil_ingresante: string;

  @Column({ type: 'text', nullable: false })
  perfil_graduado: string;

  @Column({ type: 'text', nullable: false })
  campo_laboral: string;

  @Column({ type: 'text', nullable: false })
  porQueEstudiarConNosotros: string;

  @Column({ type: 'text' })
  fecha_inicio: string;

  @Column({ type: 'text' })
  cierre_inscripciones: string;

  @Column({ type: 'float', nullable: false })
  credito: number;

  @Column({ type: 'int', nullable: false })
  vacante: number;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  tipo: string;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  tipo_posgrado: string;

  @Column({ type: 'varchar', nullable: false, length: 150 })
  tipo_maestria: string;

  @ManyToOne(() => Facultad, (facultad) => facultad.carreras, { eager: true })
  @JoinColumn({ name: 'facultadId' })
  facultad: Facultad;

  @Column({ type: 'int' })
  facultadId: number;

  @OneToMany(() => Egresado, (egresado) => egresado.carrera)
  egresados: Egresado[];

  @Column({ type: 'text' })
  intro_malla: string;

  @OneToMany(() => Asignatura, (asignatura) => asignatura.carrera)
  asignaturas: Asignatura[];

  @Column({ type: Boolean })
  en_proceso: boolean;

  @OneToMany(
    () => CarreraDocente,
    (carrera_docente) => carrera_docente.carreras,
  )
  carrera_docente: CarreraDocente[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
