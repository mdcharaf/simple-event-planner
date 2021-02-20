import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, DataType } from 'sequelize-typescript';

export interface IEvent {
  id: string,
  title: string,
  subtitle: string,
  description: string,
  date: Date,
  ticketPrice: Number,
  address: string,
  isPublished: Boolean,
  promoterId: Number;
  createdAt: Date,
  updatedAt: Date,
};

@Table
export class Event extends Model<Event> {
  @PrimaryKey
  @Column(DataType.STRING)
  public id!: string;

  @Column(DataType.STRING)
  public title!: string;

  @Column(DataType.STRING)
  public subtitle!: string;

  @Column(DataType.TEXT)
  public description!: string;

  @Column(DataType.DATE)
  public date!: Date;

  @Column(DataType.BIGINT)
  public ticketPrice!: Number;

  @Column(DataType.STRING)
  public address!: string;

  @Column(DataType.BOOLEAN)
  public isPublished: Boolean = false;

  @Column(DataType.INTEGER)
  public promoterId!: Number;

  @Column(DataType.DATE)
  @CreatedAt
  public createdAt: Date = new Date();

  @Column(DataType.DATE)
  @UpdatedAt
  public updatedAt: Date = new Date();
}