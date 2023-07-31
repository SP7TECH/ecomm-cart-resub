import React from "react";
import CartStore from "../../store/CartStore";

type IProduct = { name: string; price: number; qty: number };

class Products extends React.Component {
  handleClick(prod: IProduct) {
    CartStore.addProduct({ name: prod.name, price: prod.price, qty: 1 });
  }

  render() {
    const items = CartStore.getProducts();

    return (
      <main>
        {items.map((product) => (
          <div className="product-card" key={product.name}>
            <div className="product-card__info">
              <h3>{product.name}</h3>
              <p>Price: {product.price}</p>
            </div>
            <button
              className="primary-button"
              onClick={() => this.handleClick(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </main>
    );
  }
}

export default Products;
