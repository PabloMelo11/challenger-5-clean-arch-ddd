import Stock from '../../../domain/entity/Stock';
import StockItem from '../../../domain/entity/StockItem';
import StockRepository from '../../../domain/repository/StockRepository';

export default class StockRepositoryMemory implements StockRepository {
  items: StockItem[];

  constructor() {
    this.items = [];
  }

  async save(stock: Stock): Promise<void> {
    for (const item of stock.items) {
      this.items.push(item);
    }
  }

  async list(): Promise<Stock> {
    const stock = new Stock();
    stock.items = this.items;
    return stock;
  }

  async get(idItem: number): Promise<StockItem> {
    const item = this.items.find((item) => item.idItem === idItem);
    if (!item) throw new Error('Item does not exists!');
    return new StockItem(item.idItem, item.quantity, item.type);
  }

  async update(item: StockItem): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.idItem === item.idItem
    );
    if (itemIndex < 0) throw new Error('Item does not exists!');
    this.items[itemIndex].quantity = item.quantity;
  }

  async clear(): Promise<void> {
    this.items = [];
  }
}
