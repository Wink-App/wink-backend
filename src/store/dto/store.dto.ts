import { IsNotEmpty, IsString, IsOptional, IsUUID, IsEmail, IsArray } from 'class-validator';

export class StoreDto {
  @IsNotEmpty({ message: 'Store name must not be empty' })
  @IsString({ message: 'Store name must be a string' })
  storeName: string;

  @IsOptional()
  userId?: string;


  @IsNotEmpty({ message: 'Store category must not be empty' })
  @IsString({ message: 'Store category must be a string' })
  storeCategory: string;

 
  @IsString({ message: 'Location must be a string' })
  location: string;
  @IsEmail({}, { message: 'Invalid email format' })
 
  email: string;
  @IsNotEmpty({ message: 'phone number must not be empty' })
  @IsString({ message: 'Phone number must be a string' })
  phoneNumber: string;

  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsOptional()
  @IsString({ message: 'Rating must be a string' })
  rating: string;

  @IsOptional()
  @IsUUID(4, { message: 'Invalid UUID format for createdBy' })
  createdBy: string | null;

  @IsOptional()
  @IsUUID(4, { message: 'Invalid UUID format for updatedBy' })
  updatedBy: string | null;

  @IsArray({ message: 'Category IDs must be provided as an array' })
  categoryIds: string[];
}
