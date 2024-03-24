import { Table, Model, Column, DataType, ForeignKey, HasMany } from 'sequelize-typescript';
import { Product } from 'src/product/models/product.model';
import { Store } from 'src/store/models/store.model';
import { User } from 'src/user/models/user.model';
import { OrderStatus } from '../constants';
import { Tracking } from './tracking.model';


@Table({
  modelName: 'Order',
  tableName: 'orders',
})
export class Order extends Model<Order> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    comment: 'Order ID',
  })
  id: string;

  @ForeignKey(() => Product) // Define the association with the Product model
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'Product ID',
  })
  productId: string;
  
  @HasMany(() => Tracking, 'orderId') // Define the association with the Tracking model
  trackings: Tracking[]; // Rename the property to 'trackings' to match the association

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Tracking ID',
  })
  trackingCode: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'User ID',
  })
  userId: string;

  @ForeignKey(() => Store)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'Store ID',
  })
  storeId: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    comment: 'Total Amount',
  })
  totalAmount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Currency',
  })
  currency: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: 'Order Date',
  })
  orderDate: Date;

  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    allowNull: false,
    defaultValue: OrderStatus.PENDING,
    comment: 'Order Status',
  })
  status: OrderStatus;
}
