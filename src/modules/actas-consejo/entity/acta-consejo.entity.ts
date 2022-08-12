import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('actas-consejo')
export class ActaConsejo {
  @PrimaryGeneratedColumn()
  id: number;
}
