import { HttpStatus, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PinoLogger } from 'nestjs-pino';
import { Order } from './models/order.model';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { generateTrackingId } from './utility/trackingCode';
import { Op } from 'sequelize';
import { Tracking } from './models/tracking.model';
import { PushNotificationService } from 'src/notification/push-notification.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    @InjectModel(Tracking)
    private readonly trackingModel: typeof Tracking,
    private readonly logger: PinoLogger,
    private readonly pushNotificationService: PushNotificationService,
  ) {
    logger.setContext(OrderService.name);
  }

 
  async createOrder(createOrderDto: CreateOrderDto): Promise<any> {
    try {
      console.log('Request data:', createOrderDto);
      // Generate tracking ID
      const trackingCode = generateTrackingId();

      // Include tracking ID in the order DTO
      const orderDtoWithTrackingId = { ...createOrderDto, trackingCode };

      // Create the order
      
      const order = await this.orderModel.create(orderDtoWithTrackingId);


      // Create the tracking record and associate it with the order
      await this.trackingModel.create({
        orderId: order.id,
      
      });
      await this.pushNotificationService.sendNotification({
        userId: createOrderDto.userId,
        body:"Your Order has been placed successfully",
        sound:"default",
        priority:"high",
        data: {
          entityId: order.id,
        },
      });

      return order;
    } catch (error) {
      console.log('Error creating order', error);
      throw new NotFoundException('Error creating order');
    }
  }
  async findAllOrders(@Query() queryParams: any): Promise<{ status: number; message: string; data: Order[] }> {
    try {
      console.log('Query Params:', queryParams);
  
      let orders;
      let whereCondition = {}; // Initialize an empty object for the where condition
  
      if (queryParams.totalAmount) {
        // Parse the totalAmount as a float
        const totalAmount = parseFloat(queryParams.totalAmount);
  
        // Check if totalAmount is a valid number
        if (!isNaN(totalAmount)) {
          console.log('Applying amount condition...');
  
          // Add totalAmount condition to whereCondition
          whereCondition['totalAmount'] = totalAmount;
        } else {
          throw new Error('Invalid totalAmount value');
        }
      }
  
      // Add a condition for trackingId
      if (queryParams.trackingCode) {
        console.log('Applying trackingId condition...');
        whereCondition['trackingCode'] = queryParams.trackingCode;
      }
  
     // Add conditions for storeId and productId
     if (queryParams.storeId) {
      console.log('Applying storeId condition...');
      whereCondition['storeId'] = queryParams.storeId;
    }

    if (queryParams.productId) {
      console.log('Applying productId condition...');
      whereCondition['productId'] = queryParams.productId;
    }

    for (const key in queryParams) {
      if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
        // Check if the key is valid for filtering orders
        // You can add additional checks here based on your order model
        if (key === 'status' || key === 'userId' || key === 'storeId' || key === 'productId' || key === 'trackingCode') {
          // For direct equality comparison
          whereCondition[key] = queryParams[key];
        } else if (key !== 'totalAmount' && key !== 'trackingCode') { // Exclude totalAmount and trackingCode from string comparison
          // For other query parameters, use string comparison
          whereCondition[key] = { [Op.iLike]: `%${queryParams[key]}%` };
        }
      }
    }
  
      console.log('Where Condition:', whereCondition);
  
      // Fetch orders based on the where condition if any, otherwise fetch all orders
      orders = await this.orderModel.findAll({ where: whereCondition,
      include: [{
        model: Tracking, as : "trackings",
      }] });
  
      console.log('Orders:', orders);
  
      return { status: HttpStatus.OK, message: 'Orders found', data: orders };
    } catch (error) {
      console.log("error is", error);
      
      this.logger.error(`Error occurred while fetching orders: ${error.message}`);
      throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to fetch orders', data: null };
    }
  }
  

  async findOrderById(id: string): Promise<any> {
    try {
      const order = await this.orderModel.findByPk(id, {
        include: [{
          model: Tracking,
          as: "trackings",
        }]
      });
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return order;
    } catch (error) {
      this.logger.error(`Error finding order with id ${id}`, error);
      throw new NotFoundException('Error finding order');
    }
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<any> {
    try {
      // Find the order by ID
      const order = await this.orderModel.findByPk(id);
      if (!order) {
        throw new NotFoundException('Order not found');
      }
  
      // Store the previous status
      const previousStatus = order.status;
  
      // Update the order with the new data
      await order.update(updateOrderDto);
  
      // Find the associated tracking record
      const tracking = await this.trackingModel.findOne({ where: { orderId: order.id } });
      if (tracking) {
        // Update the status in the tracking record
        await tracking.update({ status: updateOrderDto.status });
      }
  
      // Check if the status has changed
      if (previousStatus !== updateOrderDto.status) {
        // Send notification
        await this.pushNotificationService.sendNotification({
          userId: order.userId,
          body: `Your order status has been changed to ${updateOrderDto.status}`,
          sound: "default",
          priority: "high",
          data: {
            entityId: order.id,
          },
        });
      }
  
      // Return the updated order object
      return order;
    } catch (error) {
      this.logger.error(`Error updating order with id ${id}`, error);
      throw new NotFoundException('Error updating order');
    }
  }
  
  
  async deleteOrder(id: string): Promise<any> {
    try {
      const order = await this.orderModel.findByPk(id);
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return await order.destroy();
    } catch (error) {
      this.logger.error(`Error deleting order with id ${id}`, error);
      throw new NotFoundException('Error deleting order');
    }
  }
}
