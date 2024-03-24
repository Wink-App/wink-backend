import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Category } from 'src/category/models/category.model';
import { Order } from 'src/order/models/order.model';
import { Store } from 'src/store/models/store.model';

@Table({
  modelName: 'product',
  tableName: 'products',
})
export class Product extends Model<Product> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    comment: 'Product ID',
  })
  id: string;
  @ForeignKey(() => Category) 
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'Category ID',
  })
  categoryId: string;
  @BelongsTo(() => Category) // Define association with Category model
  category: Category;

  @HasMany(() => Order) // Define the association with the Order model
  orders: Order[];

  @ForeignKey(() => Store) 
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'Store ID',
  })
  storeId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Product Variant',
  })
  variant: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Product Name',
  })
  productName: string;

 

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    comment: 'Product Price',
  })
  price: number;

  @Column({
    type: DataType.STRING,
    comment: 'Product Image',
  })
  productImage: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Stock Quantity',
  })
  stockQuantity: number;

  @Column({
    type: DataType.TEXT,
    comment: 'Product Description',
  })
  productDescription: string;
}
