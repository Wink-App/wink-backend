import { IsNotEmpty, IsString, IsNumber, IsOptional, IsIn } from 'class-validator';
import { OrderStatus } from '../constants';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'User ID cannot be empty' })
  @IsString({ message: 'User ID must be a string' })
  userId: string;
  
  
  @IsNotEmpty({ message: 'Store ID cannot be empty' })
  @IsString({ message: 'Store ID must be a string' })
  storeId?: string;

  @IsNotEmpty({ message: 'Store ID cannot be empty' })
  @IsString({ message: 'Store ID must be a string' })
  productId: string;

  @IsNotEmpty({ message: 'Total amount cannot be empty' })
  @IsNumber({}, { message: 'Total amount must be a number' })
  totalAmount: number;

  @IsNotEmpty({ message: 'Currency cannot be empty' })
  @IsString({ message: 'Currency must be a string' })
  currency: string;

  @IsNotEmpty({ message: 'Order date cannot be empty' })
  orderDate: Date;
}


export class UpdateOrderDto {


  @IsNotEmpty({ message: 'User ID cannot be empty' })
  @IsString({ message: 'User ID must be a string' })
  userId: string;
  
  @IsNotEmpty({ message: 'User ID cannot be empty' })
  @IsString({ message: 'User ID must be a string' })
  orderId: string;

  @IsOptional()
  @IsNumber({}, { message: 'Total amount must be a number' })
  totalAmount?: number;

  @IsNotEmpty({ message: 'Status cannot be empty' })
  @IsString({ message: 'Status must be a string' })
  @IsIn(Object.values(OrderStatus), { message: 'Invalid status' })
  status: OrderStatus;

  @IsOptional()
  @IsString({ message: 'Currency must be a string' })
  currency?: string;
}