import { IoIosCart } from "react-icons/io";
import CartStore from "../../store/CartStore";
import { ComponentBase } from "resub";
import CartModal from "../CartModal";

type IProduct = { name: string; price: number; qty: number };
interface ItemInfo {
  addedItems: IProduct[];
  hidden: boolean;
}

class Navigation extends ComponentBase<{}, ItemInfo> {
  calculateSumOfProductsAdded(cartItems: any[]): number {
    let sum = 0;
    cartItems.map((product) => (sum += product.price * product.qty));
    return sum;
  }

  render() {
    const { addedItems } = this.state;

    return (
      <>
        <nav>
          <h1>Ecomm Store</h1>
          <div className="cart-info">
            <p>Total in Cart: {this.calculateSumOfProductsAdded(addedItems)}</p>
            <button
              onClick={() => this.setState({ hidden: !this.state.hidden })}
              className="cart"
            >
              <IoIosCart className="cart-icon" />
              <span className="cart-notif">{addedItems.length}</span>
            </button>
          </div>
        </nav>

        {this.state.hidden && <CartModal />}
      </>
    );
  }

  protected _buildState() {
    return {
      addedItems: CartStore.getAddedItems(),
    };
  }
}

export default Navigation;
