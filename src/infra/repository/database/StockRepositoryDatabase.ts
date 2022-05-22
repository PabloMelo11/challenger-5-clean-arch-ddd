import Stock from '../../../domain/entity/Stock';
import StockItem from '../../../domain/entity/StockItem';
import StockRepository from '../../../domain/repository/StockRepository';
import Connection from '../../database/Connection';

export default class StockRepositoryDatabase implements StockRepository {
  constructor(readonly connection: Connection) {}

  async save(stock: Stock): Promise<void> {
    for (const item of stock.items) {
      await this.connection.query(
        'insert into ccca.stock (idItem, quantity) values ($1, $2)',
        [item.idItem, item.quantity]
      );
    }
  }

  async list(): Promise<Stock> {
    const stock = new Stock();
    const itemStock = await this.connection.query(
      'select code from ccca.stock',
      []
    );
    stock.items = itemStock.map(
      (item: any) => new StockItem(item.idItem, item.quantity, item.type)
    );
    return stock;
  }

  async get(idItem: number): Promise<StockItem> {
    const [item] = await this.connection.query(
      'select * from ccca.stock where idItem = $1',
      [idItem]
    );
    if (!item) throw new Error('Item does not exists!');
    return new StockItem(item.idItem, item.quantity, item.type);
  }

  async update(item: StockItem): Promise<void> {
    await this.connection.query(
      'update ccca.stock set quantity = $1 where idItem = $2',
      [item.quantity, item.idItem]
    );
  }

  clear(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
