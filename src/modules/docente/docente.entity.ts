// import { ApiProperty } from '@nestjs/swagger';
import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'docentes' })
export class Docente extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ primaryKey: true })
  public id: number;

  @Column
  public nombre: string;

  @Column
  public correo: string;

  @Column
  public grado: string;

  @Column
  public descripcion: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
