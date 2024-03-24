import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { Category } from 'src/category/models/category.model'; // Adjust import path as needed
import { ExpoToken } from './model/token.model';

@Injectable()
export class PushNotificationService {
  private expo: Expo;

  constructor(@InjectModel(ExpoToken)
  private expoTokenModel: typeof ExpoToken,) {
    this.expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
    
  }

  async sendNotification(input: any) {
    // Logic to retrieve push token of user to notify
    const pushToken = await this.getUserToken(input.userId); // Replace with actual push token retrieval logic
     if(!pushToken.token)
     {
      throw new Error("unauthenticated h tu");
     }
     console.log("inputttttttt", input);
     
    const message: ExpoPushMessage = {
      to: pushToken.token,
      sound: input.sound || null,
      priority: input.priority,
      body: input.body, // Customize notification message
      // Add any other data you want to include in the notification
    };

    try {
      const ticketChunk = await this.expo.sendPushNotificationsAsync([message]);
      console.log(ticketChunk);
     
      // Handle successful notification sending
    } catch (error) {
      console.error('Error sending push notification:', error);
      // Handle error
    }
  }

  async setUserToken(userId: string, token: string): Promise<ExpoToken> {
    // Delete previous token if it exists
    await this.expoTokenModel.destroy({ where: { userId } });

    // Create and return new token
    return await this.expoTokenModel.create({ userId, token });
}


  async getUserToken(userId: string): Promise<ExpoToken> {
    return await this.expoTokenModel.findOne({ where: { userId } });
  }
  
}
