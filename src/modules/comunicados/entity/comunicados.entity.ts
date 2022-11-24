import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Facultad } from '../../facultades/entity';
import { User } from '../../users/entities';

@Entity('comunicados')
export class Comunicado {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    nombre: string;

    @Column({ type: 'text' })
    slug: string;

    @Column({ type: 'boolean'})
    estado: boolean;

    @Column({ type: 'boolean'})
    fijar: boolean;

    @Column({type: Date})
    fecha: Date;

    @Column({ type: 'text' })
    resumen: string;

    @Column({ type: 'text' })
    cuerpoComunicado: string;

    @Column({ type: 'text' })
    pie_foto: string;

    @Column({ type: 'varchar'})
    foto: string;

    @ManyToOne(() => Facultad, (facultad) => facultad.comunicados)
    @JoinColumn({ name: 'facultadId' })
    facultad: Facultad;

    @Column({ type: 'int', nullable: false })
    facultadId: number;

    @ManyToOne(() => User, (user) => user.comunicados)
    @JoinColumn({ name: 'usuario_id' })
    user: User;

    @Column({ type: 'int' })
    usuario_id: number;

    @Column({ type: 'int' })
    last_updated_by: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updated_at: Date;


}
