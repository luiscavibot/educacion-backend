import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Evento } from '../../eventos/entity';
import { Noticia } from "src/modules/noticias/entity";

@Entity('adjuntos')
export class Adjunto extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    nombre: string;
    
    @Column({ type: 'text'})
    url:string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;

    @ManyToOne(()=> Noticia, (noticia) => noticia.adjuntos)
    @JoinColumn({ name: 'noticia_id' })
    noticia: Noticia;
    
    @Column({ name: 'noticia_id', nullable: true})
    noticia_id:number;

    @ManyToOne(()=> Evento, (evento) => evento.adjuntos)
    @JoinColumn({ name: 'evento_id' })
    evento: Evento;

    @Column({ name: 'evento_id', nullable: true})
    evento_id:number;

}
