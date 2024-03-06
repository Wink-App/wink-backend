import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { PinoLogger } from 'nestjs-pino';
import { AddressDto } from './dto/address.dto';
import { Address } from './models/address.model';
import { UserRole } from 'src/auth/enum/userRoles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userRepo: typeof User,
    @InjectModel(Address)
    private readonly addressRepo: typeof Address,
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

  async addProfile(userId: string, addressData: AddressDto) {
    this.logger.info('UserService#addProfile');
    try {
      const user = await this.userRepo.findByPk(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const address = await this.addressRepo.create({
        ...addressData,
        userId,
      });
      return address;
    } catch (error) {
      this.logger.error(`Error occurred while adding profile for user ${userId}: ${error.message}`);
      throw error;
    }
  }


  async updateProfile(userId: string, addressData: AddressDto) {
    this.logger.info('UserService#updateProfile');
    try {
      const user = await this.userRepo.findByPk(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      let address = await this.addressRepo.findOne({ where: { userId } });
      if (!address) {
        throw new NotFoundException('Address not found');
      }
  
      // Update the existing address with the new data
      await address.update(addressData);
      return address;
    } catch (error) {
      this.logger.error(`Error occurred while updating profile for user ${userId}: ${error.message}`);
      throw error;
    }
  }
  

  async findOneProfile(userId: string) {
    this.logger.info('UserService#findOneProfile');
    try {
      const address = await this.addressRepo.findOne({ where: { userId } });
      if (!address) {
        throw new NotFoundException('Address not found');
      }
      return address;
    } catch (error) {
      this.logger.error(`Error occurred while finding profile for user ${userId}: ${error.message}`);
      throw error;
    }
  }
  async findAllProfiles() {
    this.logger.info('UserService#findAllProfiles');
    try {
      const allProfiles = await User.findAll({ attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "role",
        "dateOfBirth",
        "gender",
        "FavoriteCurrency",
        "TotalAmountSpent",
        "TimeSpentInApp",
        "TimeSpentOutsideApp",
        "status"], include: [Address] });
      return allProfiles;
    } catch (error) {
      this.logger.error(`Error occurred while finding all profiles: ${error.message}`);
      throw error;
    }
  }
  
  

  async deleteProfile(userId: string) {
    this.logger.info('UserService#deleteProfile');
    try {
      const address = await this.addressRepo.findOne({ where: { userId } });
      if (!address) {
        throw new NotFoundException('Address not found');
      }
      await address.destroy();
      return { message: 'Profile deleted successfully' };
    } catch (error) {
      this.logger.error(`Error occurred while deleting profile for user ${userId}: ${error.message}`);
      throw error;
    }
  }
}
