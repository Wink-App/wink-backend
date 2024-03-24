// expo-token.model.ts
import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  modelName: 'ExpoToken',
  tableName: 'expo_tokens',
})
export class ExpoToken extends Model<ExpoToken> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    comment: 'Token ID',
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'User ID',
  })
  userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Expo Push Notification Token',
  })
  token: string;
}
