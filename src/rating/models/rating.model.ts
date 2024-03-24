import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  modelName: 'Rating',
  tableName: 'ratings',
})
export class Rating extends Model<Rating> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    comment: 'Rating ID',
  })
  id: string;

 

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
    comment: 'Star Rating (1-5)',
  })
  stars: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    comment: 'Additional Comments',
  })
  comments: string;

  //ADD KRNI H USER ID
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: 'User ID',
  })
  userId: string;
}
