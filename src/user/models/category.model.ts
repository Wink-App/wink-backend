import { Table, Model, Column, DataType } from 'sequelize-typescript';

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

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Category name',
  })
  categoryName: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    comment: 'Created by',
  })
  createdBy: string | null;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    comment: 'Updated by',
  })
  updatedBy: string | null;


}
