import EntryStock from '../../src/application/EntryStock';
import OutOfStock from '../../src/application/OutOfStock';
import Dimension from '../../src/domain/entity/Dimension';
import Item from '../../src/domain/entity/Item';
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import StockRepositoryMemory from '../../src/infra/repository/memory/StockRepositoryMemory';

test('Deve ser possível reduzir a quantidade de um item no stock', async () => {
  const stockRepository = new StockRepositoryMemory();
  const itemRepository = new ItemRepositoryMemory();
  const item = new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3);
  itemRepository.save(item);
  const inputEntry = {
    items: [{ idItem: 1, quantity: 10 }],
  };
  const inputOut = {
    items: [{ idItem: 1, quantity: 5 }],
  };
  const entryStock = new EntryStock(stockRepository, itemRepository);
  const outOfStock = new OutOfStock(stockRepository, itemRepository);
  await entryStock.execute(inputEntry);
  await outOfStock.execute(inputOut);
  const output = (await stockRepository.list()).getStock();
  expect(output[0].quantity).toBe(5);
  stockRepository.clear();
});
