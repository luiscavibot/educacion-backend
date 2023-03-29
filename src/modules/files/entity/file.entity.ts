import { PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { FileRelatedMorph } from '../../files-related-morphs/entity/file-related-morph.entity';
import { User } from '../../users/entities/user.entity';
import { Facultad } from '../../facultades/entity/facultad.entity';


@Entity('files')
export class File {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    nombre: string;

    @Column({ type: 'int' })
    width: number;

    @Column({ type: 'int' })
    height: number;

    @Column({ type: 'text'})
    originalname: string;

    @Column({ type: 'text'})
    mimetype: string;

    @Column({ type: 'text'})
    s3url: string;

    @OneToMany(() => FileRelatedMorph, (filerelatedmorph) => filerelatedmorph.file)
    filerelatedmorphs: FileRelatedMorph[];

    // @ManyToOne(() => Facultad, (facultad) => facultad.files)
    // @JoinColumn({ name: 'facultadId' })
    // facultad: Facultad;

    // @Column({ type: 'int' })
    // facultadId: number;

    @ManyToOne(() => User, (user) => user.files)
    @JoinColumn({ name: 'usuario_id' })
    user: User;

    @Column({ type: 'int' })
    usuario_id: number;

    @Column({ type: 'int' })
    last_updated_by: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updated_at: Date;
}
