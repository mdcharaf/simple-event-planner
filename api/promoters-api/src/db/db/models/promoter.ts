import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, DataType, AutoIncrement, Unique } from 'sequelize-typescript';

export interface IPromoter {
  id: Number,
  username: string,
  email: string,
  password: string,
  jwt: string,
  createdAt: Date,
  updatedAt: Date,
};

@Table
export class Promoter extends Model<IPromoter> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id!: Number;

  @Column(DataType.STRING)
  public username!: string;

  @Column(DataType.STRING)
  public email!: string;

  @Column(DataType.STRING)
  public password!: string;

  @Column(DataType.STRING)
  public jwt!: string;

  @Column(DataType.DATE)
  @CreatedAt
  public createdAt: Date = new Date();

  @Column(DataType.DATE)
  @UpdatedAt
  public updatedAt: Date = new Date();
}