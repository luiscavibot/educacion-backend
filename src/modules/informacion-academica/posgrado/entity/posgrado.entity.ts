import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Facultad } from '../../../facultades/entity/facultad.entity';
import { User } from '../../../users/entities/';

@Entity('inf_posgrado')
export class Posgrado {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    nombre: string;

    @Column({ type: 'text'})
    tipo: string;

    @Column({ type: 'text'})
    tipoPrograma: string;

    @Column({ type: 'text'})
    nombrePrograma: string;

    @Column({ type: 'text' })
    anio: string;
    
    @Column({ type: 'text'})
    url: string;

    @Column({ type: 'boolean'})
    estado: boolean;

    @Column({ type: 'boolean'})
    fijado: boolean;

    @ManyToOne(() => Facultad, (facultad) => facultad.inf_posgrado)
    @JoinColumn({ name: 'facultadId' })
    facultad: Facultad;

    @Column({ type: 'int', nullable: false })
    facultadId: number;

    @ManyToOne(() => User, (user) => user.inf_posgrado)
    @JoinColumn({ name: 'usuarioId' })
    user: User;

    @Column({ type: 'int', nullable: false })
    usuarioId: number;

    @Column({ type: 'int' })
    last_updated_by: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updated_at: Date;


}
