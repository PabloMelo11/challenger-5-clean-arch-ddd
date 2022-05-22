import CancelOrder from '../../src/application/CancelOrder';
import PlaceOrder from '../../src/application/PlaceOrder';
import Dimension from '../../src/domain/entity/Dimension';
import Item from '../../src/domain/entity/Item';
import Stock from '../../src/domain/entity/Stock';
import CouponRepository from '../../src/domain/repository/CouponRepository';
import ItemRepository from '../../src/domain/repository/ItemRepository';
import OrderRepository from '../../src/domain/repository/OrderRepository';
import StockRepository from '../../src/domain/repository/StockRepository';
import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory';
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';
import StockRepositoryMemory from '../../src/infra/repository/memory/StockRepositoryMemory';

let itemRepository: ItemRepository;
let orderRepository: OrderRepository;
let couponRepository: CouponRepository;
let stockRepository: StockRepository;

beforeEach(async function () {
  itemRepository = new ItemRepositoryMemory();
  orderRepository = new OrderRepositoryMemory();
  couponRepository = new CouponRepositoryMemory();
  stockRepository = new StockRepositoryMemory();

  stockRepository.clear();
});

afterEach(() => {
  stockRepository.clear();
});

test('Deve ser possível cancelar um pedido e voltar o item ao estoque', async () => {
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
  const cancelOrder = new CancelOrder(
    itemRepository,
    orderRepository,
    stockRepository
  );
  const inputPlaceOrder = {
    cpf: '935.411.347-80',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 1 },
    ],
  };
  const order = await placeOrder.execute(inputPlaceOrder);
  const inputCancelOrder = {
    code: order.code,
    date: new Date('2022-01-01T10:00:00'),
  };
  await cancelOrder.execute(inputCancelOrder);
  const stock = await stockRepository.list();
  const stockItems = stock.getStock();
  expect(stockItems[0].quantity).toBe(10);
  expect(stockItems[1].quantity).toBe(10);
  expect(stockItems[2].quantity).toBe(10);
});
