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
import { Evento } from '../../eventos/entity/evento.entity';
import { DocumentoOficial } from '../../documentos-oficiales/entity/documento-oficial.entity';
import { ActaConsejo } from '../../actas-consejo/entity/acta-consejo.entity';
import { Memoria } from '../../memorias/entity/memoria.entity';
import { ResolucionDecanal } from '../../resoluciones-decanales/entity/resolucion-decanal.entity';
import { Asignatura } from '../../asignaturas/entity/asignatura.entity';
import { Tramite } from '../../tramites/entity';

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

  @OneToMany(() => Asignatura, (asignatura) => asignatura.user)
  asignaturas: Asignatura[];

  @OneToMany(() => Tramite, (tramite) => tramite.user)
  tramites: Tramite[];

  @OneToMany(() => ActaConsejo, (actaConsejo) => actaConsejo.user)
  actas: ActaConsejo[];

  @OneToMany(() => Memoria, (memoria) => memoria.user)
  memorias: Memoria[];

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
