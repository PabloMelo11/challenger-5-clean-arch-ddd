import Dimension from '../../src/domain/entity/Dimension';
import Item from '../../src/domain/entity/Item';
import Stock from '../../src/domain/entity/Stock';

test('Deve ser possível dar entrada de um item no stock', () => {
  const item = new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3);
  const stock = new Stock();
  stock.addItem(item.idItem, 10);
  expect(stock.items).toHaveLength(1);
});

test('Deve ser possível reduzir uma quantidade do item no stock', () => {
  const item1 = new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3);
  const item2 = new Item(2, 'Guitarra', 1000, new Dimension(100, 30, 10), 3);
  const stock = new Stock();
  stock.addItem(item1.idItem, 10);
  stock.addItem(item1.idItem, 10);
  stock.removeItem(item1.idItem, 5);
  stock.removeItem(item1.idItem, 5);

  stock.addItem(item2.idItem, 20);
  stock.addItem(item2.idItem, 30);
  stock.removeItem(item2.idItem, 5);
  stock.removeItem(item2.idItem, 5);
  const output = stock.getStock();
  expect(output[0].quantity).toBe(10);
  expect(output[1].quantity).toBe(40);
});
