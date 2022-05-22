import ItemRepository from '../domain/repository/ItemRepository';
import OrderRepository from '../domain/repository/OrderRepository';
import StockRepository from '../domain/repository/StockRepository';
import Stock from '../domain/entity/Stock';

export default class CancelOrder {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly orderRepository: OrderRepository,
    readonly stockRepository: StockRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const stock = new Stock();
    const order = await this.orderRepository.get(input.code);
    await this.orderRepository.cancel(order, input.date);
    for (const item of order.orderItems) {
      stock.addItem(item.idItem, item.quantity);
    }
    await this.stockRepository.save(stock);
  }
}

type Input = {
  code: string;
  date: Date;
};
