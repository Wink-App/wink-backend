import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PinoLogger } from 'nestjs-pino';
import { FeedbackDTO } from './dto/feedback.dto';
import { Feedback } from './models/feedback.model';


@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback)
    private readonly feedbackModel: typeof Feedback,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(FeedbackService.name);
  }

  async createFeedback(feedbackDto: FeedbackDTO): Promise<{ status: number; message: string; data: any }> {
    try {
      const createdFeedback = await this.feedbackModel.create(feedbackDto);
      return { status: HttpStatus.CREATED, message: 'Feedback created successfully', data: createdFeedback };
    } catch (error) {
      this.logger.error(`Error occurred while creating feedback: ${error.message}`);
      throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to create feedback' };
    }
  }

  async getAllFeedbacks(): Promise<{ status: number; message: string; data: any }> {
    try {
      const feedbacks = await this.feedbackModel.findAll();
      return { status: HttpStatus.OK, message: 'Feedbacks retrieved successfully', data: feedbacks };
    } catch (error) {
      this.logger.error(`Error occurred while retrieving feedbacks: ${error.message}`);
      throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to retrieve feedbacks' };
    }
  }

  async getFeedbackById(id: string): Promise<{ status: number; message: string; data: any }> {
    try {
      const feedback = await this.feedbackModel.findByPk(id);
      if (!feedback) {
        throw new NotFoundException('Feedback not found');
      }
      return { status: HttpStatus.OK, message: 'Feedback retrieved successfully', data: feedback };
    } catch (error) {
      this.logger.error(`Error occurred while retrieving feedback: ${error.message}`);
      throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to retrieve feedback' };
    }
  }

  async deleteFeedback(id: string): Promise<{ status: number; message: string; data: any }> {
    try {
      const feedback = await this.feedbackModel.findByPk(id);
      if (!feedback) {
        throw new NotFoundException('Feedback not found');
      }
      await feedback.destroy();
      return { status: HttpStatus.OK, message: 'Feedback deleted successfully', data: null };
    } catch (error) {
      this.logger.error(`Error occurred while deleting feedback: ${error.message}`);
      throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to delete feedback' };
    }
  }

  async updateFeedback(id: string, feedbackDto: FeedbackDTO): Promise<{ status: number; message: string; data: any }> {
    try {
      const feedback = await this.feedbackModel.findByPk(id);
      if (!feedback) {
        throw new NotFoundException('Feedback not found');
      }
      await feedback.update(feedbackDto);
      return { status: HttpStatus.OK, message: 'Feedback updated successfully', data: null };
    } catch (error) {
      this.logger.error(`Error occurred while updating feedback: ${error.message}`);
      throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to update feedback' };
    }
  }
}
