import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty({ message: 'Category name must not be empty' })
  @IsString({ message: 'Category name must be a string' })
  categoryName: string;

  @IsOptional()
  createdBy?: string | null;

  @IsOptional()
  updatedBy?: string | null;
}
