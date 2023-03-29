import { Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Entity } from 'typeorm';
import { File } from '../../files/entity';

@Entity('files-related-morph')
export class FileRelatedMorph {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => File, (file) => file.filerelatedmorphs)
  @JoinColumn({ name: 'file_id' })
  file: File;

  @Column({ type: 'int'})
  file_id: number;

  @Column({ type: 'int'})
  related_id: number;
  
  @Column({ type: 'text'})
  related_type: string;

  @Column({ type: 'int'})
  order: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;
  
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
