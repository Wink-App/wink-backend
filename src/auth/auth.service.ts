// src/auth/auth.service.ts

import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/models/user.model';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { Op } from 'sequelize';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, email, password, phoneNumber, dateOfBirth, gender, role } = createUserDto;

    // Check if a user with the same email already exists
   // Check if a user with the same email already exists
    // Check if a user with the same email or phone number already exists
    const existingUser = await User.findOne({
      where: {
          [Op.or]: [
              { email }, // Check for existing email
              { phoneNumber } // Check for existing phone number
          ]
      }
  });

  if (existingUser) {
      throw new ConflictException('Email or phone number already exists');
  }
    try {
      // If the email is unique, proceed to create the new user
      const hashedPassword = await hash(password, 10);
      const user = new User({ firstName, lastName, email, password: hashedPassword, phoneNumber, dateOfBirth, gender, role });
      await user.save();
      return user;
    } catch (error) {
      throw error; // Re-throw unexpected errors
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (user && (await compare(password, user.password))) {
      return user;
    }

    return null;
  }

 // auth.service.ts

 async login(user: User): Promise<{ role: string, token: string,  userId: string }> {
  try {
    const payload = { sub: user.id, email: user.email, role: user.role }; // Include role in the payload
    const token = this.jwtService.sign(payload);
    console.log('Generated JWT token:', token); // Add this log
    return { userId: user.id, role: user.role, token };
  } catch (error) {
    console.error('Error generating JWT token:', error.message);
    throw new UnauthorizedException('Login failed. Please try again later.');
  }
}
  
}
