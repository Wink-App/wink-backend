import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  modelName: 'Feedback',
  tableName: 'feedbacks',
})
export class Feedback extends Model<Feedback> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    comment: 'Feedback ID',
  })
  id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'Product ID',
  })
  productId:  string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'Buyer/User ID',
  })
  userId: string;


  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
    comment: 'Star Rating (1-5)',
  })
  rating: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: 'Review Text',
  })
  review: string;
}
