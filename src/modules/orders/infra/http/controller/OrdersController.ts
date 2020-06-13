import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const customerFindService = container.resolve(FindOrderService);

      const customer = await customerFindService.execute({ id });

      return response.status(200).json(customer);
    } catch (error) {
      return response.status(400).json({ message: 'Erro interno' });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const serviceCreateOrder = container.resolve(CreateOrderService);

    const order = await serviceCreateOrder.execute({ customer_id, products });

    return response.status(200).json(order);
  }
}
