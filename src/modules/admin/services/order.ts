import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { IOrder } from 'modules/database/interfaces/order';

import { Order } from './../../database/models/order';
import { OrderRepository } from './../repositories/order';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  public async save(model: IOrder): Promise<Order> {
    if (!model) {
      throw new NotFoundException('not-found');
    }
    console.log(model);
    if (model.id) return this.orderRepository.update(model);
    return this.orderRepository.insert(model);
  }

  public async remove(orderId: number, currentUser: ICurrentUser): Promise<void> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException('not-found');
    }

    if (order.userId !== currentUser.id) {
      throw new BadRequestException('not-the-same-user');
    }

    if (order.id !== orderId) {
      throw new BadRequestException('not-the-same-order');
    }

    return this.orderRepository.remove(orderId);
  }
}
