import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { StoreService } from './store.service';
import { StoreDto } from './dto/store.dto';

@Controller('store')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(StoreController.name);
  }

  @Post()
  async create(@Body() storeDto: StoreDto) {
    try {
      return await this.storeService.create(storeDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() storeDto: StoreDto) {
    try {
      return await this.storeService.update(id, storeDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.storeService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.storeService.findAll();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

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
