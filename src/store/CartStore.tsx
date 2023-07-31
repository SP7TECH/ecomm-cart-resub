import { StoreBase, AutoSubscribeStore, autoSubscribe } from "resub";

type IProduct = { name: string; price: number; qty: number };
@AutoSubscribeStore
class CartStore extends StoreBase {
  items: any[] = [
    { name: "Prod One", price: 40, qty: 0 },
    { name: "Prod Two", price: 50, qty: 0 },
    { name: "Prod Three", price: 60, qty: 0 },
    { name: "Prod Four", price: 70, qty: 0 },
    { name: "Prod Five", price: 80, qty: 0 },
  ];

  addedItems: any[] = [];

  addProduct(prod: IProduct) {
    if (this.addedItems.length) {
      let productIndex = this.addedItems.findIndex(
        (product) => product.name === prod.name
      );
      if (productIndex > -1)
        this.addedItems[productIndex] = {
          name: this.addedItems[productIndex].name,
          price: this.addedItems[productIndex].price,
          qty: this.addedItems[productIndex].qty + 1,
        };
      else this.addedItems.push(prod);
    }

    if (this.addedItems.length === 0) this.addedItems.push(prod);
    this.trigger();
  }

  resetCart() {
    this.addedItems = [];
    this.trigger();
  }

  @autoSubscribe
  getProducts() {
    return this.items;
  }

  @autoSubscribe
  getAddedItems() {
    return this.addedItems;
  }
}

export default new CartStore();
