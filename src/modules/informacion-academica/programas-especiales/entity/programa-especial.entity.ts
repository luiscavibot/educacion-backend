import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Entity } from 'typeorm';
import { User } from '../../../users/entities/user.entity';

@Entity('programas_especiales')
export class ProgramaEspecial {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    nombre: string;
    
    @Column({ type: 'text'})
    tipoRecurso: string;

    @Column({ type: 'varchar', nullable: false })   
    tipoProgramaEspecial: string;

    @Column({ type: 'varchar', nullable: false })  
    url: string;

    @Column({ type: 'int', nullable: false })  
    anio: number;

    @Column({ type: 'boolean', default: false })
    publicado: boolean;

    @Column({ type: 'boolean' })
    fijado: boolean;

    @Column({ type: 'int' })
    usuarioId: number;

    @ManyToOne(() => User, (user) => user.programa_especial)
    @JoinColumn({ name: 'usuarioId' })
    user: User;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;
}
