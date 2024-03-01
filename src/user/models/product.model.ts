// product.model.ts

import { Table, Model, Column, DataType } from 'sequelize-typescript';

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

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Product Name',
  })
  productName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Product Category',
  })
  category: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Product Price',
  })
  price: number;

  @Column({
    type: DataType.JSON,
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
    type: DataType.STRING,
    comment: 'Product Description',
  })
  productDescription: string;
}
