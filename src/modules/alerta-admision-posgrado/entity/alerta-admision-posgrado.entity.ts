import { User } from "src/modules/users/entities";
import { 
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity('alertas_admision_posgrado')
export class AlertaAdmisionPosgrado extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false, length: 50 })
    titulo: string;

    @Column({ type: 'varchar', nullable: true })
    ciclo: string;

    @Column({ type: 'varchar', nullable: true, length: 250 })
    descripcion: string;

    @Column({ type: 'timestamp', nullable: true })
    fecha_inicio: Date;

    @Column({ type: 'timestamp', nullable: true })
    fecha_fin: Date;

    @Column({ type: 'boolean', default: false })
    publicado: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;
    
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;

    @Column({ type: 'int', nullable: true})
    last_updated_by: number;

    @Column({ type: 'int', nullable: false })
    usuario_id: number;

    @ManyToOne(() => User, (user) => user.alertas_admision_posgrado)
    @JoinColumn({ name: 'usuario_id' })
    user: User;
}