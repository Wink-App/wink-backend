import { Injectable, NotFoundException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PinoLogger } from 'nestjs-pino';
import { Category } from 'src/category/models/category.model';
import { StoreDto } from './dto/store.dto';
import { Store } from './models/store.model';
import { StoreCategory } from './models/store_categories.model';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store)
    private readonly storeModel: typeof Store,
    @InjectModel(StoreCategory)
    private readonly storeCategoryModel: typeof StoreCategory,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(StoreService.name);
  }

  async create(storeDto: StoreDto): Promise<{ status: number; message: string; data: Store }> {
    try {
      console.log("data is", storeDto);
      
        const createdStore = await this.storeModel.create(storeDto);

        // Insert records into StoreCategory table for each associated category
        await Promise.all(storeDto.categoryIds.map(async (categoryId) => {
            await this.storeCategoryModel.create({ storeId: createdStore.id, categoryId });
        }));

        return { status: HttpStatus.CREATED, message: 'Store created successfully', data: createdStore };
    } catch (error) {
        this.logger.error(`Error occurred while creating store: ${error.message}`);
        throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to create store' };
    }
}


  async update(id: string, storeDto: StoreDto): Promise<{ status: number; message: string; data: Store }> {
    try {
      const [updatedCount, [updatedStore]] = await this.storeModel.update(storeDto, {
        where: { id },
        returning: true,
      });
      if (updatedCount === 0) {
        throw new NotFoundException(`Store with id ${id} not found`);
      }
      return { status: HttpStatus.OK, message: 'Store updated successfully', data: updatedStore };
    } catch (error) {
      this.logger.error(`Error occurred while updating store: ${error.message}`);
      throw { status: HttpStatus.NOT_FOUND, message: error.message };
    }
  }

  async findOne(id: string): Promise<{ status: number; message: string; data: Store }> {
    try {
        const store = await this.storeModel.findByPk(id, {
            include: [{ model: Category }] // Include associated categories
        });
        if (!store) {
            throw new NotFoundException(`Store with id ${id} not found`);
        }
        return { status: HttpStatus.OK, message: 'Store found', data: store };
    } catch (error) {
        this.logger.error(`Error occurred while finding store: ${error.message}`);
        throw { status: HttpStatus.NOT_FOUND, message: error.message };
    }
}


async findAll(): Promise<{ status: number; message: string; data: Store[] }> {
  try {
      const stores = await this.storeModel.findAll({
          include: [{ model: Category }] // Include associated categories
      });
      return { status: HttpStatus.OK, message: 'Stores found', data: stores };
  } catch (error) {
      this.logger.error(`Error occurred while fetching stores: ${error.message}`);
      throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to fetch stores' };
  }
}


  async delete(id: string): Promise<{ status: number; message: string }> {
    try {
      const deletedCount = await this.storeModel.destroy({ where: { id } });
      if (deletedCount === 0) {
        throw new NotFoundException(`Store with id ${id} not found`);
      }
      return { status: HttpStatus.OK, message: 'Store deleted successfully' };
    } catch (error) {
      this.logger.error(`Error occurred while deleting store: ${error.message}`);
      throw { status: HttpStatus.NOT_FOUND, message: error.message };
    }
  }
}
