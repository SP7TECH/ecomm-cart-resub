import { ComponentBase } from "resub";
import CartStore from "../../store/CartStore";
import { Box, Button, Typography } from "@material-ui/core";
import theme from "../../theme";

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
    };
  }
}

export default CartModal;
