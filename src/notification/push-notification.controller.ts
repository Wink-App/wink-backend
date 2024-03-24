// expo-token.controller.ts
import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/enum/userRoles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { PushNotificationService } from './push-notification.service';


@Controller('notifications')
export class NotificationController {
  constructor(private readonly expoTokenService: PushNotificationService) {}

  @Roles(UserRole.SELLER, UserRole.ADMIN, UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':userId')
  async setUserToken(@Param('userId') userId: string, @Body('token') token: string): Promise<any> {
    return this.expoTokenService.setUserToken(userId, token);
  }

  @Get(':userId')
  async getUserToken(@Param('userId') userId: string): Promise<any> {
    return this.expoTokenService.getUserToken(userId);
  }
}

//order create krny par or sttaus par dena notifiaction trigger