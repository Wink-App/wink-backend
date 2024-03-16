import { Table, Model, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Category } from 'src/category/models/category.model';
import { Store } from 'src/store/models/store.model';

@Table({
  modelName: 'store_category',
  tableName: 'store_categories',
})
export class StoreCategory extends Model<StoreCategory> {
  @ForeignKey(() => Store)
  @Column({
    allowNull: false,
    comment: 'Store ID',
  })
  storeId: string;

  @BelongsTo(() => Store)
  store: Store;

  @ForeignKey(() => Category)
  @Column({
    allowNull: false,
    comment: 'Category ID',
  })
  categoryId: string;

  @BelongsTo(() => Category)
  category: Category;
}
