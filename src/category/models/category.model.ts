import { Table, Model, Column, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Product } from 'src/product/models/product.model';

import { Store } from 'src/store/models/store.model';
import { StoreCategory } from 'src/store/models/store_categories.model';


@Table({
  modelName: 'category',
  tableName: 'categories',
})
export class Category extends Model<Category> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    comment: 'Category ID',
  })
  id: string;
  
  @HasMany(() => Product) // Define one-to-many association with Product model
  products: Product[];
  @BelongsToMany(() => Store, () => StoreCategory)
stores: Store[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    comment: 'Category name',
  })
  categoryName: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    comment: 'Created by',
  })
  createdBy: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    comment: 'Updated by',
  })
  updatedBy: string;


}
