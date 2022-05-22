import Stock from '../domain/entity/Stock';
import ItemRepository from '../domain/repository/ItemRepository';
import StockRepository from '../domain/repository/StockRepository';

export default class OutOfStock {
  constructor(
    readonly stockRepository: StockRepository,
    readonly itemRepository: ItemRepository
  ) {}

  async execute(input: Input): Promise<void> {
    const stock = new Stock();
    for (const itemStock of input.items) {
      const item = await this.itemRepository.get(itemStock.idItem);
      stock.removeItem(item.idItem, itemStock.quantity);
    }
    this.stockRepository.save(stock);
  }
}

type Input = {
  items: { idItem: number; quantity: number }[];
};
