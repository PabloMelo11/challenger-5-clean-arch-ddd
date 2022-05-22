import CouponRepository from '../repository/CouponRepository';
import ItemRepository from '../repository/ItemRepository';
import OrderRepository from '../repository/OrderRepository';
import StockRepository from '../repository/StockRepository';

export default interface RepositoryFactory {
  createItemRepository(): ItemRepository;
  createOrderRepository(): OrderRepository;
  createCouponRepository(): CouponRepository;
  createStockRepository(): StockRepository;
}
