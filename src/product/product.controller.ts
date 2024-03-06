import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { UserRole } from 'src/auth/enum/userRoles.enum';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(ProductController.name);
  }

  @Post()
  async create(@Body() productDto: ProductDto) {
    try {
      return await this.productService.create(productDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() productDto: ProductDto) {
    try {
      return await this.productService.update(id, productDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
 
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.productService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.productService.findAll();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.productService.delete(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
