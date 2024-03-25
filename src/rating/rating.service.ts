import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RatingDTO } from './dto/rating.dto';
import { Rating } from './models/rating.model';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating)
    private readonly ratingModel: typeof Rating,
  ) {}

  async createRating(ratingDto: RatingDTO): Promise<{ status: number; message: string; data: any }> {
    try {
      const createdRating = await this.ratingModel.create(ratingDto);
      return { status: 201, message: 'Rating created successfully', data: createdRating };
    } catch (error) {
      throw { status: 500, message: 'Error creating rating', error };
    }
  }

  async getAllRatings(): Promise<{ status: number; message: string; data: any }> {
    try {
      const ratings = await this.ratingModel.findAll();
      return { status: 200, message: 'All ratings retrieved successfully', data: ratings };
    } catch (error) {
      throw { status: 500, message: 'Error retrieving ratings', error };
    }
  }

  async getRatingById(id: string): Promise<{ status: number; message: string; data: any }> {
    try {
      const rating = await this.ratingModel.findByPk(id);
      if (!rating) {
        throw { status: 404, message: 'Rating not found' };
      }
      return { status: 200, message: 'Rating retrieved successfully', data: rating };
    } catch (error) {
      throw { status: error.status || 500, message: error.message || 'Error retrieving rating', error };
    }
  }

  async deleteRating(id: string): Promise<{ status: number; message: string; data: any }> {
    try {
      const deletedCount = await this.ratingModel.destroy({ where: { id } });
      if (deletedCount === 0) {
        throw { status: 404, message: 'Rating not found' };
      }
      return { status: 200, message: 'Rating deleted successfully', data: null };
    } catch (error) {
      throw { status: error.status || 500, message: error.message || 'Error deleting rating', error };
    }
  }

  async updateRating(id: string, ratingDto: RatingDTO): Promise<{ status: number; message: string; data: any }> {
    try {
      const [updatedCount] = await this.ratingModel.update(ratingDto, { where: { id } });
      if (updatedCount === 0) {
        throw { status: 404, message: 'Rating not found' };
      }
      const updatedRating = await this.ratingModel.findByPk(id);
      
      // Return the updated rating data
      return { status: 200, message: 'Rating updated successfully', data: updatedRating };
    } catch (error) {
      throw { status: error.status || 500, message: error.message || 'Error updating rating', error };
    }
  }
}
