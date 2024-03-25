import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RatingDTO } from './dto/rating.dto';
import { RatingService } from './rating.service';


@Controller('ratings') // Update the controller route to 'ratings'
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async create(@Body() ratingDto: RatingDTO): Promise<{ status: number; message: string; data: any }> {
    try {
      const result = await this.ratingService.createRating(ratingDto);
      return { status: result.status, message: result.message, data: result.data };
    } catch (error) {
      return { status: error.status, message: error.message, data: null };
    }
  }

  @Get()
  async findAll(): Promise<{ status: number; message: string; data: any }> {
    try {
      const result = await this.ratingService.getAllRatings();
      return { status: result.status, message: result.message, data: result.data };
    } catch (error) {
      return { status: error.status, message: error.message, data: null };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ status: number; message: string; data: any }> {
    try {
      const result = await this.ratingService.getRatingById(id);
      return { status: result.status, message: result.message, data: result.data };
    } catch (error) {
      return { status: error.status, message: error.message, data: null };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ status: number; message: string; data: any }> {
    try {
      const result = await this.ratingService.deleteRating(id);
      return { status: result.status, message: result.message, data: result.data };
    } catch (error) {
      return { status: error.status, message: error.message, data: null };
    }
  }

  @Patch(':id') // Change @Put to @Patch
  async update(@Param('id') id: string, @Body() ratingDto: RatingDTO): Promise<{ status: number; message: string; data: any }> {
    try {
      const result = await this.ratingService.updateRating(id, ratingDto);
      return { status: result.status, message: result.message, data: result.data };
    } catch (error) {
      return { status: error.status, message: error.message, data: null };
    }
  }
}
