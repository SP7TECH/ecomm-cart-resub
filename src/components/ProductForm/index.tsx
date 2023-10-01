import { FormControl, TextField, Button, Typography } from "@material-ui/core";
import React from "react";
import CartStore from "../../store/CartStore";
import theme from "../../theme";
import { toast } from "react-toastify";

type IProduct = { name: string; price: number; qty: number };

class ProductForm extends React.Component {
  state = {
    productName: "",
    price: 0,
    qty: 0,
  };

  handleCreateProduct(prod: IProduct) {
    if (
      this.state.productName === "" ||
      this.state.price === 0 ||
      this.state.qty === 0
    )
      return toast("Please fill all the fields", {
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    CartStore.createProduct(prod);
  }

  render() {
    return (
      <form
        className="product-form"
        onSubmit={(e) => {
          e.preventDefault();
          this.handleCreateProduct({
            name: this.state.productName,
            price: this.state.price,
            qty: this.state.qty,
          });
        }}
      >
        <FormControl style={{ width: "25%" }}>
          <TextField
            label="Product Name"
            variant="outlined"
            type="text"
            name="name"
            value={this.state.productName}
            onChange={(e) => this.setState({ productName: e.target.value })}
          />
        </FormControl>

        <FormControl style={{ width: "25%" }}>
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            name="price"
            value={this.state.price}
            onChange={(e) => this.setState({ price: e.target.value })}
          />
        </FormControl>

        <FormControl style={{ width: "25%" }}>
          <TextField
            label="Quantity"
            variant="outlined"
            type="number"
            name="qty"
            value={this.state.qty}
            onChange={(e) => this.setState({ qty: e.target.value })}
          />
        </FormControl>

        <Button
          variant="outlined"
          type="submit"
          style={{
            borderColor: theme.palette.primary.main,
            padding: 15,
            width: "20%",
          }}
        >
          <Typography variant="button">Add Product</Typography>
        </Button>
      </form>
    );
  }
}

export default ProductForm;
