import { Table, Model, Column, DataType, Default, HasMany } from 'sequelize-typescript';
import { UserRole } from 'src/auth/enum/userRoles.enum';
import { Order } from 'src/order/models/order.model';
import { Address } from './address.model';

@Table({
  modelName: 'user',
  tableName: 'users',
})
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    comment: 'User ID',
  })
  id: string;
  // Define the association with the Address model
  @HasMany(() => Address)
  addresses: Address[];
   // Add the following association
  @HasMany(() => Order)
  orders: Order[];

  @Column({
    type: DataType.STRING,
    comment: 'User name',
  })
  firstName: string;

  @Column({ 
    type: DataType.STRING,
    comment: 'User last name', 
  })
  lastName: string; 
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'User email',
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'User password',
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: 'User phone number',
    unique: true,
  })
  phoneNumber: string;


  @Default(UserRole.USER)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'User role',
  })
  role: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'User date of birth',
  })
  dateOfBirth: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: 'User gender',
  })
  gender: string;
  //  FavoriteCurrency, TotalAmountSpent, TimeSpentInApp, TimeSpentOutsideApp
  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: 'User currency',
  })
  FavoriteCurrency: string;
  @Default(0)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    comment: 'User total time',
  })
  TotalAmountSpent: number;
  @Default(0)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    comment: 'User time spent',
  })
  TimeSpentInApp: number;
  @Default(0)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    comment: 'User time spent outside',
  })
  TimeSpentOutsideApp: number;

  // @Column({
  //   type: DataType.STRING,
  //   allowNull: true,
  //   comment: 'User favorite currency',
  // })
  // favoriteCurrency: string;

  @Default('PENDING')
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'User status',
  })
  status: string;

 
}
