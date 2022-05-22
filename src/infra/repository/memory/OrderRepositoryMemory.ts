import Order from '../../../domain/entity/Order';
import OrderRepository from '../../../domain/repository/OrderRepository';

export default class OrderRepositoryMemory implements OrderRepository {
  orders: Order[];

  constructor() {
    this.orders = [];
  }

  async save(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async count(): Promise<number> {
    return this.orders.length;
  }

  async list(): Promise<Order[]> {
    return this.orders;
  }

  async get(code: string): Promise<Order> {
    const order = this.orders.find((order) => order.code.value === code);
    if (!order) throw new Error('Order does not exists');
    return order;
  }

  async clear(): Promise<void> {
    this.orders = [];
  }

  async cancel(order: Order, cancelDate: Date): Promise<void> {
    const orderIndex = this.orders.findIndex(
      (orderArr) => orderArr.code === order.code
    );
    if (orderIndex < 0) throw new Error('Order does not exists!');
    this.orders[orderIndex].canceledAt = cancelDate;
  }
}
