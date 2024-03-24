import { IsNotEmpty, IsUUID, IsInt, Min, Max, IsOptional, IsString, MaxLength } from 'class-validator';

export class FeedbackDTO {
  @IsNotEmpty({ message: 'Product ID must not be empty' })
 
  productId: string;

  @IsNotEmpty({ message: 'User ID must not be empty' })
 
  userId: string;

  @IsNotEmpty({ message: 'Rating must not be empty' })
  @IsInt({ message: 'Rating must be an integer' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must be at most 5' })
  rating: number;

  @IsOptional()
  @IsString({ message: 'Review must be a string' })
  @MaxLength(500, { message: 'Review must not exceed 500 characters' })
  review?: string;
}
