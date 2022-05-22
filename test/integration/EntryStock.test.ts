import EntryStock from '../../src/application/EntryStock';
import Dimension from '../../src/domain/entity/Dimension';
import Item from '../../src/domain/entity/Item';
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import StockRepositoryMemory from '../../src/infra/repository/memory/StockRepositoryMemory';

test('Deve ser possível dar entrada de um item no stock', async () => {
  const stockRepository = new StockRepositoryMemory();
  const itemRepository = new ItemRepositoryMemory();
  const item = new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10), 3);
  itemRepository.save(item);
  const input = {
    items: [{ idItem: 1, quantity: 10 }],
  };
  const entryStock = new EntryStock(stockRepository, itemRepository);
  await entryStock.execute(input);
  const output = await itemRepository.list();
  expect(output).toHaveLength(1);
  stockRepository.clear();
});
