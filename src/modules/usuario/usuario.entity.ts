import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Perfil } from '../perfil/perfil.entity';

@Table({ tableName: 'usuarios' })
export class Usuario extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ primaryKey: true })
  public id: number;

  @Column({
    type: DataType.STRING,
  })
  public nombre: string;

  @Column({
    type: DataType.STRING,
  })
  public apellido_paterno: string;

  @Column({
    type: DataType.STRING,
  })
  public apellido_materno: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  public correo: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public password: string;

  @ForeignKey(() => Perfil)
  @Column
  perfil_id: number;

  @BelongsTo(() => Perfil)
  perfil: Perfil;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
