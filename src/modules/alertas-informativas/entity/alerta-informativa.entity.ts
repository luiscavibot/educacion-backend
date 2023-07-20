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

@Entity('alertas_informativas')
export class AlertaInformativa extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false, length: 50 })
    nombre!: string;

    @Column({ type: 'varchar', nullable: false, length: 80 })
    descripcion!: string;

    @Column({ type: 'varchar', nullable: false })
    url!: string;

    @Column({ type: 'int' })
    last_updated_by: number;

    @Column({ type: 'boolean' })
    publicado: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.alertas_informativas)
    @JoinColumn({ name: 'usuario_id' })
    user: User;

    @Column({ type: 'int' })
    usuario_id: number;
}