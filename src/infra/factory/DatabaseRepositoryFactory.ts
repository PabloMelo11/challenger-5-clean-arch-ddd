import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import CouponRepository from '../../domain/repository/CouponRepository';
import ItemRepository from '../../domain/repository/ItemRepository';
import OrderRepository from '../../domain/repository/OrderRepository';
import StockRepository from '../../domain/repository/StockRepository';
import Connection from '../database/Connection';
import CouponRepositoryDatabase from '../repository/database/CouponRepositoryDatabase';
import ItemRepositoryDatabase from '../repository/database/ItemRepositoryDatabase';
import OrderRepositoryDatabase from '../repository/database/OrderRepositoryDatabase';
import StockRepositoryDatabase from '../repository/database/StockRepositoryDatabase';

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(readonly connection: Connection) {}

  createItemRepository(): ItemRepository {
    return new ItemRepositoryDatabase(this.connection);
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(this.connection);
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(this.connection);
  }

  createStockRepository(): StockRepository {
    return new StockRepositoryDatabase(this.connection);
  }
}
