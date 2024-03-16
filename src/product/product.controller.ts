import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException, Query, UseGuards } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { UserRole } from 'src/auth/enum/userRoles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(ProductController.name);
  }

  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() productDto: ProductDto) {
    try {
      return await this.productService.create(productDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() productDto: ProductDto) {
    try {
      return await this.productService.update(id, productDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
 
  @Roles(UserRole.SELLER, UserRole.ADMIN,  UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.productService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles(UserRole.SELLER, UserRole.ADMIN, UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(@Query() queryParams: any) {
    try {
      return await this.productService.findAll(queryParams);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.productService.delete(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
