import { IsNotEmpty, IsUUID, IsInt, Min, Max, IsOptional, IsString, MaxLength } from 'class-validator';

export class RatingDTO {
 

  @IsOptional()
 
  comments: string;

  @IsNotEmpty({ message: 'User ID must not be empty' })
 
  userId: string;


  @IsOptional()
 
  @IsNotEmpty({ message: 'Rating must not be empty' })
  @IsInt({ message: 'Rating must be an integer' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must be at most 5' })
  stars?: number;
}
