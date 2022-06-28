import { Usuario } from '../usuario/usuario.entity';
import {
  AutoIncrement,
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'perfiles' })
export class Perfil extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ primaryKey: true })
  public id: Number;

  @Column
  public nombre: string;

  @HasMany(() => Usuario)
  usuarios: Usuario[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
