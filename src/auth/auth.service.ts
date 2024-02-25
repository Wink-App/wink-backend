// src/auth/auth.service.ts

import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/models/user.model';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      
      const { firstName, lastName, email, password, phoneNumber, dateOfBirth, gender, role } = createUserDto;
      const hashedPassword = await hash(password, 10);
      const user = new User({ firstName, lastName, email, password: hashedPassword, phoneNumber, dateOfBirth, gender, role});
      await user.save();
      return user;
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw new InternalServerErrorException('Could not create user. Please try again later.');
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (user && (await compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<string> {
    try {
      const payload = { sub: user.id, email: user.email };
      return this.jwtService.sign(payload);
    } catch (error) {
      console.error('Error generating JWT token:', error.message);
      throw new UnauthorizedException('Login failed. Please try again later.');
    }
  }
}
