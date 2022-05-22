import Dimension from '../../src/domain/entity/Dimension';
import Item from '../../src/domain/entity/Item';
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';
import PlaceOrder from '../../src/application/PlaceOrder';
import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory';
import Coupon from '../../src/domain/entity/Coupon';
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase';
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter';
import Connection from '../../src/infra/database/Connection';
import OrderRepository from '../../src/domain/repository/OrderRepository';
import RepositoryFactory from '../../src/domain/factory/RepositoryFactory';
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory';
import MemoryRepositoryFactory from '../../src/infra/factory/MemoryRepositoryFactory';
import ItemRepository from '../../src/domain/repository/ItemRepository';
import CouponRepository from '../../src/domain/repository/CouponRepository';
import StockRepository from '../../src/domain/repository/StockRepository';
import StockRepositoryMemory from '../../src/infra/repository/memory/StockRepositoryMemory';
import Stock from '../../src/domain/entity/Stock';

let connection: Connection;
let itemRepository: ItemRepository;
let orderRepository: OrderRepository;
let couponRepository: CouponRepository;
let stockRepository: StockRepository;
let repositoryFactory: RepositoryFactory;

describe('Place Order Integration', () => {
  beforeEach(async function () {
    connection = new PgPromiseConnectionAdapter();
    repositoryFactory = new MemoryRepositoryFactory();
    itemRepository = new ItemRepositoryMemory();
    orderRepository = new OrderRepositoryMemory();
    couponRepository = new CouponRepositoryMemory();
    stockRepository = new StockRepositoryMemory();
    await orderRepository.clear();
    stockRepository.clear();
  });

  afterEach(async function () {
    await connection.close();
    stockRepository.clear();
  });

  test('Deve fazer um pedido e reduzir itens do estoque', async function () {
    const item1 = new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3);
    const item2 = new Item(
      2,
      'Amplificador',
      5000,
      new Dimension(50, 50, 50),
      20
    );
    const item3 = new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1);

    itemRepository.save(item1);
    itemRepository.save(item2);
    itemRepository.save(item3);

    const newStock = new Stock();
    newStock.addItem(item1.idItem, 10);
    newStock.addItem(item2.idItem, 10);
    newStock.addItem(item3.idItem, 10);

    stockRepository.save(newStock);

    const placeOrder = new PlaceOrder(
      itemRepository,
      orderRepository,
      couponRepository,
      stockRepository
    );
    const input = {
      cpf: '935.411.347-80',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
    };
    await placeOrder.execute(input);
    const stock = await stockRepository.list();
    const output = stock.getStock();
    expect(output[0].quantity).toBe(9);
    expect(output[1].quantity).toBe(9);
    expect(output[2].quantity).toBe(7);
  });
});
