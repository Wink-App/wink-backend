import { IsNotEmpty, IsString } from 'class-validator';

export class AddressDto {
  @IsNotEmpty({ message: 'City must not be empty' })
  @IsString({ message: 'City must be a string' })
  city: string;

  @IsNotEmpty({ message: 'State must not be empty' })
  @IsString({ message: 'State must be a string' })
  state: string;

  @IsNotEmpty({ message: 'Country must not be empty' })
  @IsString({ message: 'Country must be a string' })
  country: string;

  @IsNotEmpty({ message: 'Street address must not be empty' })
  streetAddress: string;
}
