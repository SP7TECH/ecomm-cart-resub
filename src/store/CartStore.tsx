import { StoreBase, AutoSubscribeStore, autoSubscribe } from "resub";

type IProduct = {
  name: string;
  price: number;
  qty: number;
};
@AutoSubscribeStore
class CartStore extends StoreBase {
  items: any[] = [
    { name: "Prod One", price: 40, qty: 12, availableQty: 12 },
    { name: "Prod Two", price: 50, qty: 13, availableQty: 13 },
    { name: "Prod Three", price: 60, qty: 14, availableQty: 14 },
    { name: "Prod Four", price: 70, qty: 21, availableQty: 21 },
    { name: "Prod Five", price: 80, qty: 22, availableQty: 22 },
  ];

  addedItems: any[] = [];

  createProduct(prod: IProduct) {
    this.items.push(prod);
    this.trigger();
  }

  addProduct(prod: IProduct) {
    // finding index in items array

    let productIndexInItems = this.items.findIndex(
      (product) => product.name === prod.name
    );

    if (this.items[productIndexInItems].qty === 0) console.log("out of stock");

    if (this.addedItems.length) {
      // finding index in addedItems Array
      let productIndex = this.addedItems.findIndex(
        (product) => product.name === prod.name
      );

      if (productIndex > -1) {
        this.addedItems[productIndex] = {
          name: this.addedItems[productIndex].name,
          price: this.addedItems[productIndex].price,
          qty: this.addedItems[productIndex].qty + 1,
        };
      } else {
        this.addedItems.push(prod);
      }
    }

    if (this.addedItems.length === 0) this.addedItems.push(prod);
    this.items[productIndexInItems] = {
      name: this.items[productIndexInItems].name,
      price: this.items[productIndexInItems].price,
      qty: this.items[productIndexInItems].qty - 1,
    };
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
