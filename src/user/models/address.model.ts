import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';

@Table({
  modelName: 'address',
  tableName: 'addresses',
})
export class Address extends Model<Address> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    comment: 'Address ID',
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    comment: 'User ID',
    field: 'user_id', // Specify the foreign key name
  })
  userId: string;

  @Column({
    type: DataType.STRING,
    comment: 'City',
  })
  city: string;

  @Column({
    type: DataType.STRING,
    comment: 'State',
  })
  state: string;

  @Column({
    type: DataType.STRING,
    comment: 'Country',
  })
  country: string;

  @Column({
    type: DataType.STRING,
    comment: 'Street Address',
  })
  streetAddress: string;
}
