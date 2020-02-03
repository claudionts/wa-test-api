import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from 'modules/common/guards/token';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { enRoles } from 'modules/database/interfaces/user';
import { Order } from 'modules/database/models/order';

import { OrderListValidator } from '../validators/order/list';
import { OrderRepository } from './../repositories/order';
import { OrderService } from './../services/order';
import { SaveOrderValidator } from './../validators/order/saveOrder';

@ApiTags('Admin: Order')
@Controller('/order')
@AuthRequired([enRoles.admin, enRoles.user])
export class OrderController {
  constructor(private orderRepository: OrderRepository, private orderService: OrderService) {}

  @Post('')
  @ApiResponse({ status: 201, type: Order })
  public async insert(@Body() model: SaveOrderValidator, @CurrentUser() currentUser?: ICurrentUser) {
    model.userId = currentUser.id;
    return this.orderService.save(model);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async list(@Query() model: OrderListValidator, @CurrentUser() currentUser?: ICurrentUser) {
    return this.orderRepository.listForUser(model, currentUser);
  }

  @Get(':orderId')
  @ApiResponse({ status: 200, type: Order })
  public async details(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderRepository.findById(orderId);
  }

  @Delete(':orderId')
  public async delete(@Param('orderId', ParseIntPipe) orderId: number, @CurrentUser() currentUser: ICurrentUser) {
    return this.orderService.remove(orderId, currentUser);
  }
}
