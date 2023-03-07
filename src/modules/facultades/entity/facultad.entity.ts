import { ActaConsejo } from '../../transparencia/actas-consejo/entity/';
import { Area } from '../../areas/entity';
import { Carrera } from '../../carreras/entity';
import { Comunicado} from '../../informacion-academica/comunicados/entity';
import { Directorio } from '../../directorios/entity/';
import { DocumentoOficial } from '../../transparencia/documentos-oficiales/entity/';
import { Egresado } from '../../egresados/entity';
import { Evento } from '../../eventos/entity';
import { GrupoInvestigacion } from '../../grupos-investigacion/entity/';
import { Memoria } from '../../transparencia/memorias/entity/memoria.entity';
import { Noticia } from '../../noticias/entity';
import { Posgrado } from '../../informacion-academica/posgrado/entity/';
import { Pregrado } from '../../informacion-academica/pregrado/entity/';
import { Programa } from '../../programas/entity/';
import { ResolucionDecanal } from '../../transparencia/resoluciones-decanales/entity/';
import { Tramite } from '../../tramites/entity/';
import { User } from '../../users/entities/';
import { Dirigido } from '../../dirigidos/entity/dirigido.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @Column({ type: 'text' })
  frontendDomain: string;

  @Column({ type: 'varchar', nullable: false, length: 300 })
  slug!: string;

  @OneToMany(() => Noticia, (noticia) => noticia.user.facultad)
  noticias: Noticia[];

  @OneToMany(() => Evento, (evento) => evento.user.facultad)
  eventos: Evento[];

  @OneToMany(() => Directorio, (directorio) => directorio.user.facultad)
  directorios: Directorio[];

  @OneToMany(() => Tramite, (tramite) => tramite.user.facultad)
  tramites: Tramite[];

  @OneToMany(() => Carrera, (carrera) => carrera.facultad)
  carreras: Carrera[];

  @OneToMany(() => Programa, (programa) => programa.facultad)
  programas: Programa[];

  @OneToMany(() => Pregrado, (pregrado) => pregrado.facultad)
  inf_pregrado: Pregrado[];

  @OneToMany(() => Posgrado, (posgrado) => posgrado.facultad)
  inf_posgrado: Posgrado[];

  @OneToMany(() => Comunicado, (comunicado) => comunicado.facultad)
  comunicados: Comunicado[];

  @ManyToMany(() => Dirigido)
  @JoinTable()
  dirigidos: Dirigido[]

  @OneToMany(
    () => DocumentoOficial,
    (documentoOficial) => documentoOficial.facultad,
  )
  documentosOficiales: DocumentoOficial[];

  @OneToMany(
    () => ResolucionDecanal,
    (resolucionDecanal) => resolucionDecanal.user.facultad,
  )
  resolucionesDecanales: ResolucionDecanal[];

  @OneToMany(() => User, (user) => user.facultad)
  users: User[];

  @OneToMany(
    () => GrupoInvestigacion,
    (grupoInvestigacion) => grupoInvestigacion.facultad,
  )
  grupos_investigacion: GrupoInvestigacion[];

  @OneToMany(() => ActaConsejo, (actaConsejo) => actaConsejo.facultad)
  actas: ActaConsejo[];

  @OneToMany(() => Memoria, (memoria) => memoria.user.facultad)
  memorias: Memoria[];

  @ManyToOne(() => Area, (area) => area.facultades)
  @JoinColumn({ name: 'areaId' })
  area: Area;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
