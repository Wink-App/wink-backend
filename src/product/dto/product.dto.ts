import { IsNotEmpty, IsString, IsUUID, IsNumber, IsOptional, IsUrl, IsInt, Min } from 'class-validator';

export class ProductDto {
  @IsNotEmpty({ message: 'Product variant must not be empty' })
  @IsString({ message: 'Product variant must be a string' })
  variant: string;

  @IsNotEmpty({ message: 'Product name must not be empty' })
  @IsString({ message: 'Product name must be a string' })
  productName: string;

  @IsNotEmpty({ message: 'Product category ID must not be empty' })
  @IsUUID(4, { message: 'Invalid UUID format for category ID' })
  categoryId: string;

  @IsNotEmpty({ message: 'Product store ID must not be empty' })
  @IsUUID(4, { message: 'Invalid UUID format for store ID' })
  storeId: string;

  @IsNotEmpty({ message: 'Product price must not be empty' })
  @IsNumber({}, { message: 'Product price must be a number' })
  price: number;

 
  @IsString({ message: 'Product images must be a valid url string' })
  productImage: string;

  @IsNotEmpty({ message: 'Stock quantity must not be empty' })
  @IsInt({ message: 'Stock quantity must be an integer' })
  @Min(0, { message: 'Stock quantity must be at least 0' })
  stockQuantity: number;

  @IsOptional()
  @IsString({ message: 'Product description must be a string' })
  productDescription: string;
}
