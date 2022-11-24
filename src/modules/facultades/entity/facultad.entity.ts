import { Area } from '../../areas/entity';
import { Noticia } from '../../noticias/entity';
import { Carrera } from '../../carreras/entity';
import { Evento } from '../../eventos/entity';
import { Egresado } from '../../egresados/entity';
import { User } from '../../users/entities/user.entity';
import { Directorio } from '../../directorios/entity/directorio.entity';
import { Tramite } from '../../tramites/entity/tramite.entity';
import { DocumentoOficial } from '../../transparencia/documentos-oficiales/entity/documento-oficial.entity';
import { ResolucionDecanal } from '../../transparencia/resoluciones-decanales/entity/resolucion-decanal.entity';
import { GrupoInvestigacion } from '../../grupos-investigacion/entity/grupo-investigacion.entity';
import { Memoria } from '../../transparencia/memorias/entity/memoria.entity';
import { ActaConsejo } from '../../transparencia/actas-consejo/entity/acta-consejo.entity';
import { Comunicado} from '../../informacion-academica/comunicados/entity';
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

  @Column({ type: 'text' })
  frontendDomain: string;

  @Column({ type: 'varchar', nullable: false, length: 300 })
  slug!: string;

  @OneToMany(() => Noticia, (noticia) => noticia.facultad)
  noticias: Noticia[];

  @OneToMany(() => Evento, (evento) => evento.facultad)
  eventos: Evento[];

  @OneToMany(() => Directorio, (directorio) => directorio.facultad)
  directorios: Directorio[];

  @OneToMany(() => Tramite, (tramite) => tramite.facultad)
  tramites: Tramite[];

  @OneToMany(() => Carrera, (carrera) => carrera.facultad)
  carreras: Carrera[];

  @OneToMany(() => Comunicado, (comunicado) => comunicado.facultad)
  comunicados: Comunicado[];

  @OneToMany(
    () => DocumentoOficial,
    (documentoOficial) => documentoOficial.facultad,
  )
  documentosOficiales: DocumentoOficial[];

  @OneToMany(
    () => ResolucionDecanal,
    (resolucionDecanal) => resolucionDecanal.facultad,
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

  @OneToMany(() => Memoria, (memoria) => memoria.facultad)
  memorias: Memoria[];

  @ManyToOne(() => Area, (area) => area.facultades)
  @JoinColumn({ name: 'areaId' })
  area: Area;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
