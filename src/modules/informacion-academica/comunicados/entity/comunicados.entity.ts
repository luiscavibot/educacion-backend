import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from '../../../users/entities';

@Entity('comunicados')
export class Comunicado {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    nombre: string;

    @Column({ type: 'text', nullable:true })
    slug: string;

    @Column({ type: 'text', nullable:true })
    foto: string;

    @Column({ type: 'text', nullable:true })
    pie_foto: string;

    @Column({ type: 'boolean', default:false})
    estado: boolean;

    @Column({ type: 'boolean'})
    fijar: boolean;

    @Column({type: Date})
    fecha: Date;

    @Column({ type: 'text' })
    resumen: string;

    @Column({ type: 'text' })
    cuerpoComunicado: string;

    @ManyToOne(() => User, (user) => user.comunicados)
    @JoinColumn({ name: 'usuario_id' })
    user: User;

    @Column({ type: 'int' })
    usuario_id: number;

    @Column({ type: 'int', nullable: true })
    last_updated_by: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updated_at: Date;

}
