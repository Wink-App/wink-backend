import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException, UseGuards } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { StoreService } from './store.service';
import { StoreDto } from './dto/store.dto';
import { UserRole } from 'src/auth/enum/userRoles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
@Controller('store')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(StoreController.name);
  }
  
  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
 
  @Post()
  async create(@Body() storeDto: StoreDto) {
    try {
      return await this.storeService.create(storeDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() storeDto: StoreDto) {
    try {
      return await this.storeService.update(id, storeDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Roles(UserRole.SELLER, UserRole.ADMIN,  UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.storeService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Roles(UserRole.SELLER, UserRole.ADMIN,  UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    try {
      return await this.storeService.findAll();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.storeService.delete(id);
      return { message: 'Store deleted successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
