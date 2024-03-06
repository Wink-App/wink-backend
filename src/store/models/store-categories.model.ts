import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { Category } from 'src/category/models/category.model';
import { Store } from 'src/store/models/store.model';


@Table({
  modelName: 'store_category', // Bridge table ka naam
  tableName: 'store_categories', // Table ka naam
})
export class StoreCategory extends Model<StoreCategory> {
 
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        comment: 'ID of the store-category relationship',
      })
      id: string;

  @ForeignKey(() => Store) // Foreign key for store
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'Store ID',
  })
  storeId: string;

  @ForeignKey(() => Category) // Foreign key for category
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'Category ID',
  })
  categoryId: string;
}
