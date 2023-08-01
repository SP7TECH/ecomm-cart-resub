import { ComponentBase } from "resub";
import CartStore from "../../store/CartStore";
import { Box, Button, Typography } from "@material-ui/core";
import theme from "../../theme";
import { ToastContainer, toast } from "react-toastify";

type IProduct = { name: string; price: number; qty: number };
interface ItemInfo {
  addedItems: IProduct[];
  items: IProduct[];
}

class CartModal extends ComponentBase<{}, ItemInfo> {
  checkOutOfStock(prod: IProduct): true | false {
    let productIndex = this.state.items.findIndex(
      (product) => product.name === prod.name
    );
    if (this.state.items[productIndex].qty === 0) return true;

    return false;
  }

  handleQuantityIncrement(prod: IProduct) {
    if (this.checkOutOfStock(prod)) {
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />;
      return toast("Out of Stock!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    CartStore.incrementQuantity(prod);
  }

  handleQuantityDecrement(prod: IProduct) {
    if (this.checkOutOfStock(prod)) {
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />;
      return toast("Out of Stock!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    CartStore.decrementQuantity(prod);
  }

  render() {
    const { addedItems, items } = this.state;

    return (
      <div className="cart-modal">
        {addedItems.map((product) => (
          <Box
            sx={{
              bgcolor: theme.palette.primary.light,
              padding: 15,
              borderRadius: 5,
            }}
            mb={2}
            key={product.name}
          >
            <div className="product-card__info">
              <h3>{product.name}</h3>
              <p>Price: {product.price * product.qty}</p>
            </div>
            <p className="product-card__quantity">Qty: {product.qty}</p>

            <div className="product-card__controls">
              <button onClick={() => this.handleQuantityDecrement(product)}>
                -
              </button>
              <p className="product-card__controls-quantity">{product.qty}</p>
              <button onClick={() => this.handleQuantityIncrement(product)}>
                +
              </button>
            </div>
          </Box>
        ))}
        <Button variant="outlined" onClick={() => CartStore.resetCart()}>
          <Typography variant="button">Reset Cart</Typography>
        </Button>
      </div>
    );
  }

  protected _buildState() {
    return {
      addedItems: CartStore.getAddedItems(),
      items: CartStore.getProducts(),
    };
  }
}

export default CartModal;
