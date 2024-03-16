import { Table, Model, Column, DataType, HasMany, BelongsToMany, HasOne, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Category } from 'src/category/models/category.model';
import { Product } from 'src/product/models/product.model';
import { StoreCategory } from 'src/store/models/store_categories.model';
import { User } from 'src/user/models/user.model';

@Table({
  modelName: 'store',
  tableName: 'stores',
})
export class Store extends Model<Store> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    comment: 'Category ID',
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID, // Assuming User.id is UUID
   
    comment: 'Seller or user id of the store',
  })
  userId: string;

  // Define the association with the User model
  @BelongsTo(() => User)
  user: User;
  @HasMany(() => Product) // Define one-to-many relationship with Product model
  products: Product[];

  @BelongsToMany(() => Category, () => StoreCategory)
categories: Category[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Store name',
  })
  storeName: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: 'Email of the store',
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: 'Phone number of the store',
  })
  phoneNumber: string;
 

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Store category',
  })
  storeCategory: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: 'Location of the store',
  })
  location: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: 'Description of the store',
  })
  description: string;

  
  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: 'Rating of the store',
  })
  rating: string;

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
