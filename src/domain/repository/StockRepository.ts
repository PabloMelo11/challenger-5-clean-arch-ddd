import Stock from '../entity/Stock';
import StockItem from '../entity/StockItem';

export default interface StockRepository {
  save(stock: Stock): Promise<void>;
  list(): Promise<Stock>;
  get(idItem: number): Promise<StockItem>;
  update(item: StockItem): Promise<void>;
  clear(): Promise<void>;
}
