import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userRepo: typeof User,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(UserService.name);
  }

  async create(createUserDto: CreateUserDto) {
    this.logger.info('UserService#create');
    const user = await this.userRepo.create(createUserDto);
    return 'This action adds a new user';
  }

  async findAll() {
    this.logger.info('UserService#findAll');
    const allUsers = await this.userRepo.findAll();
    this.logger.info(allUsers);
    return allUsers;
    // return `This action returns all user`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
