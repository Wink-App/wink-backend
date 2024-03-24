import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/enum/userRoles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { FeedbackDTO } from './dto/feedback.dto';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async create(@Body() feedbackDto: FeedbackDTO): Promise<{ status: number; message: string; data: any }> {
    try {
      const result = await this.feedbackService.createFeedback(feedbackDto);
      return { status: result.status, message: result.message, data: result.data };
    } catch (error) {
      return { status: error.status, message: error.message, data: null };
    }
  }

  @Get()
  async findAll(): Promise<{ status: number; message: string; data: any }> {
    try {
      const result = await this.feedbackService.getAllFeedbacks();
      return { status: result.status, message: result.message, data: result.data };
    } catch (error) {
      return { status: error.status, message: error.message, data: null };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ status: number; message: string; data: any }> {
    try {
      const result = await this.feedbackService.getFeedbackById(id);
      return { status: result.status, message: result.message, data: result.data };
    } catch (error) {
      return { status: error.status, message: error.message, data: null };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ status: number; message: string; data: any }> {
    try {
      const result = await this.feedbackService.deleteFeedback(id);
      return { status: result.status, message: result.message, data: result.data };
    } catch (error) {
      return { status: error.status, message: error.message, data: null };
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() feedbackDto: FeedbackDTO): Promise<{ status: number; message: string; data: any }> {
    try {
      const result = await this.feedbackService.updateFeedback(id, feedbackDto);
      return { status: result.status, message: result.message, data: result.data };
    } catch (error) {
      return { status: error.status, message: error.message, data: null };
    }
  }
}
