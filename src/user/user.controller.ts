import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddressDto } from './dto/address.dto';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UserRole } from 'src/auth/enum/userRoles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(UserController.name);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // findAll() {
  //   this.logger.info('UserController#findAll');
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
  @Roles(UserRole.SELLER, UserRole.ADMIN ,UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
 @Post(':userId/profile')
  async addProfile(@Param('userId') userId: string, @Body() addressData: AddressDto) {
    return this.userService.addProfile(userId, addressData);
  }


  @Roles(UserRole.SELLER, UserRole.ADMIN ,UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':userId/profile')
  async updateProfile(@Param('userId') userId: string, @Body() addressData: AddressDto) {
    return this.userService.updateProfile(userId, addressData);
  }

  @Roles(UserRole.SELLER, UserRole.ADMIN , UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':userId/profile')
  async findOneProfile(@Param('userId') userId: string) {
    return this.userService.findOneProfile(userId);
  }


  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profiles')
  async findAllProfiles() {
   
    
    return this.userService.findAllProfiles();
  }
  
  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':userId/profile')
  async deleteProfile(@Param('userId') userId: string) {
    return this.userService.deleteProfile(userId);
  }

}
