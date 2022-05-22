import ItemRepository from '../domain/repository/ItemRepository';
import Order from '../domain/entity/Order';
import OrderRepository from '../domain/repository/OrderRepository';
import CouponRepository from '../domain/repository/CouponRepository';
import StockRepository from '../domain/repository/StockRepository';
import FreightCalculator from '../domain/entity/FreightCalculator';
import RepositoryFactory from '../domain/factory/RepositoryFactory';
import Stock from '../domain/entity/Stock';

export default class PlaceOrder {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly orderRepository: OrderRepository,
    readonly couponRepository: CouponRepository,
    readonly stockRepository: StockRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const sequence = (await this.orderRepository.count()) + 1;
    const order = new Order(input.cpf, input.date, sequence);
    const stock = new Stock();
    let freight = 0;
    const freightCalculator = new FreightCalculator();
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.get(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
      freight += freightCalculator.calculate(item, orderItem.quantity);
      stock.removeItem(item.idItem, orderItem.quantity);
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.get(input.coupon);
      order.addCoupon(coupon);
    }
    // order.freight = (freight > 0 && freight < 10) ? 10 : freight;
    await this.orderRepository.save(order);
    this.stockRepository.save(stock);
    const total = order.getTotal();
    return {
      code: order.code.value,
      total,
    };
  }
}

type Input = {
  cpf: string;
  orderItems: { idItem: number; quantity: number }[];
  coupon?: string;
  date?: Date;
};

type Output = {
  code: string;
  total: number;
};
