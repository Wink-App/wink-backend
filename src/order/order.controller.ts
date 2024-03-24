import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, NotFoundException } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(OrderController.name);
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<any> {
    return this.orderService.createOrder(createOrderDto);
  }

  // @Get()
  // async findAll(): Promise<any> {
  //   return this.orderService.findAllOrders();
  // }
  
  @Get()
  async findAll(@Query() queryParams: any) {
    try {
      return await this.orderService.findAllOrders(queryParams);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.orderService.findOrderById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<any> {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.orderService.deleteOrder(id);
  }
}
