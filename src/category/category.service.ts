import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PinoLogger } from 'nestjs-pino';
import { CategoryDto } from './dto/category.dto';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(CategoryService.name);
  }

  async create(categoryDto: CategoryDto): Promise<{ status: number; message: string; data: Category }> {
    try {
      const createdCategory = await this.categoryModel.create(categoryDto);
      return { status: HttpStatus.CREATED, message: 'Category created successfully', data: createdCategory };
    } catch (error) {
      this.logger.error(`Error occurred while creating category: ${error.message}`);
      throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to create category' };
    }
  }

  async update(id: string, categoryDto: CategoryDto): Promise<{ status: number; message: string; data: Category }> {
    try {
      const [updatedCount, updatedCategories] = await this.categoryModel.update(categoryDto, {
        where: { id },
        returning: true,
      });
      if (updatedCount === 0) {
        throw new NotFoundException(`Category with id ${id} not found`);
      }
      return { status: HttpStatus.OK, message: 'Category updated successfully', data: updatedCategories[0] };
    } catch (error) {
      this.logger.error(`Error occurred while updating category: ${error.message}`);
      throw { status: HttpStatus.NOT_FOUND, message: error.message };
    }
  }

  async findOne(id: string): Promise<{ status: number; message: string; data: Category }> {
    try {
      const category = await this.categoryModel.findByPk(id);
      if (!category) {
        throw new NotFoundException(`Category with id ${id} not found`);
      }
      return { status: HttpStatus.OK, message: 'Category found', data: category };
    } catch (error) {
      this.logger.error(`Error occurred while finding category: ${error.message}`);
      throw { status: HttpStatus.NOT_FOUND, message: error.message };
    }
  }

  async findAll(): Promise<{ status: number; message: string; data: Category[] }> {
    try {
      const categories = await this.categoryModel.findAll();
      return { status: HttpStatus.OK, message: 'Categories found', data: categories };
    } catch (error) {
      this.logger.error(`Error occurred while fetching categories: ${error.message}`);
      throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to fetch categories' };
    }
  }

  async delete(id: string): Promise<{ status: number; message: string }> {
    try {
      const deletedCount = await this.categoryModel.destroy({ where: { id } });
      if (deletedCount === 0) {
        throw new NotFoundException(`Category with id ${id} not found`);
      }
      return { status: HttpStatus.OK, message: 'Category deleted successfully' };
    } catch (error) {
      this.logger.error(`Error occurred while deleting category: ${error.message}`);
      throw { status: HttpStatus.NOT_FOUND, message: error.message };
    }
  }
}
