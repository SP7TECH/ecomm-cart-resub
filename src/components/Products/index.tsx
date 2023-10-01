import CartStore from "../../store/CartStore";
import { Box, Button, Typography } from "@material-ui/core";
import theme from "../../theme";
import { ComponentBase } from "resub";
import ProductForm from "../ProductForm";
import { ToastContainer, toast } from "react-toastify";

type IProduct = { name: string; price: number; qty: number };
interface CartInfo {
  productList: IProduct[];
  addedItems: IProduct[];
}

class Products extends ComponentBase<{}, CartInfo> {
  handleClick(prod: IProduct) {
    if (prod.qty === 0) {
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
    CartStore.addProduct({ name: prod.name, price: prod.price, qty: 1 });
  }

  render() {
    const { productList, addedItems } = this.state;

    return (
      <>
        <ProductForm />
        <div className="product-container">
          {productList.map((product) => (
            <Box
              sx={{
                bgcolor: theme.palette.primary.light,
                padding: 15,
                borderRadius: 5,
              }}
              key={product.name}
            >
              <div className="product-card__info">
                <h3>{product.name}</h3>
                <p>Price: {product.price}</p>
              </div>
              <p className="product-card__quantity">
                Available Qty: {product.qty}
              </p>
              <Button
                variant="outlined"
                style={{
                  borderColor: theme.palette.primary.main,
                  marginTop: 10,
                }}
                onClick={() => this.handleClick(product)}
              >
                <Typography variant="button">Add to Cart</Typography>
              </Button>
            </Box>
          ))}
        </div>
      </>
    );
  }

  protected _buildState(): CartInfo {
    return {
      productList: CartStore.getProducts(),
      addedItems: CartStore.getAddedItems(),
    };
  }
}

export default Products;
