import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import CouponRepository from '../../domain/repository/CouponRepository';
import ItemRepository from '../../domain/repository/ItemRepository';
import OrderRepository from '../../domain/repository/OrderRepository';
import StockRepository from '../../domain/repository/StockRepository';
import CouponRepositoryMemory from '../repository/memory/CouponRepositoryMemory';
import ItemRepositoryMemory from '../repository/memory/ItemRepositoryMemory';
import OrderRepositoryMemory from '../repository/memory/OrderRepositoryMemory';
import StockRepositoryMemory from '../repository/memory/StockRepositoryMemory';

export default class MemoryRepositoryFactory implements RepositoryFactory {
  createItemRepository(): ItemRepository {
    return new ItemRepositoryMemory();
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryMemory();
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryMemory();
  }

  createStockRepository(): StockRepository {
    return new StockRepositoryMemory();
  }
}
