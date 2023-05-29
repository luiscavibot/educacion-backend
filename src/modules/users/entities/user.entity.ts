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
import { Evento } from '../../eventos/entity';
import { DocumentoOficial } from '../../transparencia/documentos-oficiales/entity';
import { ActaConsejo } from '../../transparencia/actas-consejo/entity';
import { Memoria } from '../../transparencia/memorias/entity';
import { ResolucionDecanal } from '../../transparencia/resoluciones-decanales/entity';
import { Asignatura } from '../../asignaturas/entity';
import { Tramite } from '../../tramites/entity';
import { EnlaceInteres } from '../../enlaces-interes/entity';
import { Comunicado } from '../../informacion-academica/comunicados/entity';
import { Pregrado } from '../../informacion-academica/pregrado/entity/';
import { Posgrado } from '../../informacion-academica/posgrado/entity/';
import { Directorio } from '../../directorios/entity/directorio.entity';
import { AlertaInformativa } from '../../alertas-informativas/entity';
import { ProgramaEspecial } from '../../informacion-academica/programas-especiales/entity/programa-especial.entity';
import { AlertaAdmisionPosgrado } from '../../alerta-admision-posgrado/entity/alerta-admision-posgrado.entity';
import { File } from '../../files/entity';

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

  @OneToMany(() => File, (file) => file.user)
  files: File[];

  @OneToMany(() => AlertaInformativa, (alertas_informativas) => alertas_informativas.user)
  alertas_informativas: AlertaInformativa[];

  @OneToMany(() => AlertaAdmisionPosgrado, (alertas_admision_posgrado) => alertas_admision_posgrado.user)
  alertas_admision_posgrado: AlertaAdmisionPosgrado[];

  @OneToMany(() => ProgramaEspecial, (programa_especial) => programa_especial.user)
  programa_especial: ProgramaEspecial[];

  @OneToMany(() => Comunicado, (comunicado) => comunicado.user)
  comunicados: Comunicado[];
  
  @OneToMany(() => Directorio, (directorio) => directorio.user)
  directorios: Directorio[];

  @OneToMany(() => EnlaceInteres, (enlace) => enlace.user)
  enlaces_interes: EnlaceInteres[];

  @OneToMany(() => Asignatura, (asignatura) => asignatura.user)
  asignaturas: Asignatura[];

  @OneToMany(() => Tramite, (tramite) => tramite.user)
  tramites: Tramite[];

  @OneToMany(() => ActaConsejo, (actaConsejo) => actaConsejo.user)
  actas: ActaConsejo[];

  @OneToMany(() => Memoria, (memoria) => memoria.user)
  memorias: Memoria[];

  @OneToMany(() => Pregrado, (pregrado) => pregrado.user)
  inf_pregrado: Pregrado[];

  @OneToMany(() => Posgrado, (posgrado) => posgrado.user)
  inf_posgrado: Posgrado[];

  @OneToMany(
    () => DocumentoOficial,
    (documentoOficial) => documentoOficial.user,
  )
  documentos: DocumentoOficial[];

  @OneToMany(
    () => ResolucionDecanal,
    (resolucionDecanal) => resolucionDecanal.user,
  )
  resoluciones: ResolucionDecanal[];

  @OneToMany(() => Evento, (evento) => evento.user)
  eventos: Evento[];

  @Column({ type: 'int', nullable: true })
  proyecto: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
