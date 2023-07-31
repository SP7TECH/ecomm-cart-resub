import { ComponentBase } from "resub";
import CartStore from "../../store/CartStore";

type IProduct = { name: string; price: number; qty: number };
interface ItemInfo {
  addedItems: IProduct[];
}

class CartModal extends ComponentBase<{}, ItemInfo> {
  render() {
    const { addedItems } = this.state;

    return (
      <div className="cart-modal">
        {addedItems.map((product) => (
          <div className="product-card mb-4" key={product.name}>
            <div className="product-card__info">
              <h3>{product.name}</h3>
              <p>Price: {product.price * product.qty}</p>
            </div>
            <p className="product-card__quantity">Qty: {product.qty}</p>
          </div>
        ))}
        <button
          className="primary-button"
          onClick={() => CartStore.resetCart()}
        >
          Reset Cart
        </button>
      </div>
    );
  }

  protected _buildState() {
    return {
      addedItems: CartStore.getAddedItems(),
    };
  }
}

export default CartModal;
