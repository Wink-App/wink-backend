import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PinoLogger } from 'nestjs-pino';
import { ProductDto } from './dto/product.dto';
import { Product } from './models/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(ProductService.name);
  }

  async create(productDto: ProductDto): Promise<{ status: number; message: string; data: Product }> {
    try {
      const createdProduct = await this.productModel.create(productDto);
      return { status: HttpStatus.CREATED, message: 'Product created successfully', data: createdProduct };
    } catch (error) {
      this.logger.error(`Error occurred while creating product: ${error.message}`);
      throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to create product', data: null };
    }
  }

  async update(id: string, productDto: ProductDto): Promise<{ status: number; message: string; data: Product }> {
    try {
      const [updatedCount, [updatedProduct]] = await this.productModel.update(productDto, { where: { id }, returning: true });
      if (updatedCount === 0) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      return { status: HttpStatus.OK, message: 'Product updated successfully', data: updatedProduct };
    } catch (error) {
      this.logger.error(`Error occurred while updating product: ${error.message}`);
      throw { status: HttpStatus.NOT_FOUND, message: error.message, data: null };
    }
  }

  async findOne(id: string): Promise<{ status: number; message: string; data: Product }> {
    try {
      const product = await this.productModel.findByPk(id);
      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      return { status: HttpStatus.OK, message: 'Product found', data: product };
    } catch (error) {
      this.logger.error(`Error occurred while finding product: ${error.message}`);
      throw { status: HttpStatus.NOT_FOUND, message: error.message, data: null };
    }
  }

  async findAll(): Promise<{ status: number; message: string; data: Product[] }> {
    try {
      const products = await this.productModel.findAll();
      return { status: HttpStatus.OK, message: 'Products found', data: products };
    } catch (error) {
      this.logger.error(`Error occurred while fetching products: ${error.message}`);
      throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to fetch products', data: null };
    }
  }

  async delete(id: string): Promise<{ status: number; message: string }> {
    try {
      const deletedCount = await this.productModel.destroy({ where: { id } });
      if (deletedCount === 0) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      return { status: HttpStatus.OK, message: 'Product deleted successfully' };
    } catch (error) {
      this.logger.error(`Error occurred while deleting product: ${error.message}`);
      throw { status: HttpStatus.NOT_FOUND, message: error.message };
    }
  }
}
