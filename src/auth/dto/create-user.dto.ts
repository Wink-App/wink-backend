
// role admin nae ho skty baqi sab ho sakty h 

// src/auth/dto/create-user.dto.ts

import { IsNotEmpty, IsEmail, IsString, IsPhoneNumber, IsDateString, IsIn, IsOptional } from 'class-validator';
import { UserRole } from '../enum/userRoles.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'First name must not be empty' })
  @IsString({ message: 'First name must be a string' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name must not be empty' })
  @IsString({ message: 'Last name must be a string' })
  lastName: string;

  @IsNotEmpty({ message: 'Email must not be empty' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password must not be empty' })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @IsNotEmpty({ message: 'Phone number must not be empty' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Date of birth must not be empty' })
  @IsDateString({ strict: true }, { message: 'Date of birth must be a valid date in the format YYYY-MM-DD' })
  dateOfBirth: string;

  @IsNotEmpty({ message: 'Gender must not be empty' })
  @IsString({ message: 'Gender must be a string' })
  @IsIn(['male', 'female'], { message: 'Gender must be either "male" or "female"' })
  gender: string;

  
  @IsOptional()
  @IsString({ message: 'Role must be a string' })
  @IsIn(Object.values(UserRole), { message: 'Invalid role. Must be one of: ' + Object.values(UserRole).join(', ') })
  role: string = UserRole.SELLER; // Set default user role if not provided
}

  // @IsNotEmpty({ message: 'Role must not be empty' })
  // @IsString({ message: 'Role must be a string' })
  // @IsIn(['user'], { message: 'Role must be "user"' })
  // role: string;

