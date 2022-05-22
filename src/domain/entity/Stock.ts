import StockItem from './StockItem';

export default class Stock {
  items: StockItem[];

  constructor() {
    this.items = [];
  }

  addItem(idItem: number, quantity: number) {
    this.items.push(new StockItem(idItem, quantity, 'entry'));
  }

  removeItem(idItem: number, quantity: number) {
    this.items.push(new StockItem(idItem, quantity, 'out'));
  }

  getStock() {
    const items: StockItem[] = [];

    for (const stockItem of this.items) {
      const itemIndex = items.findIndex(
        (item) => item.idItem === stockItem.idItem
      );

      const existItem = itemIndex >= 0;

      if (!existItem) {
        items.push(
          new StockItem(stockItem.idItem, stockItem.quantity, stockItem.type)
        );
      } else {
        items[itemIndex].quantity = stockItem.recalculate(
          items[itemIndex].quantity
        );
      }
    }

    return items;
  }
}
