import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/enum/userRoles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Category } from './models/category.model';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(CategoryController.name);
  }
  //  @Roles(UserRole.SELLER)
  //  @UseGuards(JwtAuthGuard, RolesGuard)
  //commenting permission for adding category

  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() categoryDto: CategoryDto) {
    try {
      return await this.categoryService.create(categoryDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() categoryDto: CategoryDto) {
    try {
      return await this.categoryService.update(id, categoryDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
 @Roles(UserRole.SELLER, UserRole.ADMIN,  UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.categoryService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Roles(UserRole.SELLER, UserRole.ADMIN,  UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }
  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.categoryService.delete(id);
      return { message: 'Category deleted successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
