export default class StockItem {
  quantity: number;

  constructor(
    readonly idItem: number,
    quantity: number,
    readonly type: string
  ) {
    this.quantity = quantity;
  }

  recalculate(oldQuantity: number) {
    if (this.type === 'entry') {
      oldQuantity += this.quantity;
    } else {
      oldQuantity -= this.quantity;
    }

    return oldQuantity;
  }
}
