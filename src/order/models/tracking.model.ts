import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { OrderStatus } from '../constants';
import { Order } from './order.model'; // Assuming the path to the Order model

@Table({
  modelName: 'Tracking',
  tableName: 'tracking',
})
export class Tracking extends Model<Tracking> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    comment: 'Tracking ID',
  })
  id: string;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'Order ID',
  })
  orderId: string;

  @BelongsTo(() => Order, 'orderId') // Define the association with the Order model
  order: Order; // Rename the property to 'order' to match the association

  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    allowNull: false,
    defaultValue: OrderStatus.PENDING,
    comment: 'Order Status',
  })
  status: OrderStatus;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    comment: 'Creation Date',
  })
  createdAt: Date;
}
