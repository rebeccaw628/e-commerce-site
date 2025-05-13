// import { useParams } from "react-router";
import { useState, useContext } from "react";

import type { ProductDbResponse } from "../../services/product-services";
import classes from "./ProductPage.module.scss";
import { CartContext } from "../../context/CartProvider";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { updateFavourite } from "../../services/product-services";

interface ProductPageProps {
  productData: ProductDbResponse;
}

const ProductPage = ({ productData }: ProductPageProps) => {
  const [chosenVariant, setChosenVariant] = useState(0);
  const { cartItems, addToCart } = useContext(CartContext);
  const { title, subCategory, price, variants, material, dimensions } =
    productData;

  const displayChosen = () => {
    setChosenVariant((prev) =>
      prev === productData.variants.length - 1 ? 0 : prev + 1
    );
  };

  const handleAdd = async (productData: ProductDbResponse) => {
    console.log("add button clicked from productPage");
    const color = productData.variants[chosenVariant].color;
    const added = await addToCart(productData, color);
    if (added) {
      console.log(
        "item in stock, item added to cart. all items in cart:",
        cartItems
      );
    } else {
      console.log("item out of stock, item not added");
    }
  };
  console.log(cartItems);

  return (
    <div className={classes.product}>
      <img
        src={variants[chosenVariant].imgURL}
        alt={productData.category}
        className={classes.product__img}
      ></img>

      <div className={classes.product__text}>
        <h3>{title}</h3>
        <h2>{subCategory}</h2>
        <p>${price}</p>

        <p>
          <span className={classes.product__bold}>Colour: </span>
          {variants[chosenVariant].color}
        </p>
        {variants.length > 1 && (
          <div className={classes.variants}>
            {variants.map((variant, index) => (
              <img
                key={variant.color}
                src={variant.imgURL}
                alt={productData.category}
                className={`${classes.variants__img} ${
                  chosenVariant === index ? classes.selected : ""
                }`}
                onClick={displayChosen}
              ></img>
            ))}
          </div>
        )}
        <button
          className={classes.product__add}
          onClick={() => handleAdd(productData)}
        >
          Add to Cart
        </button>
        <p>
          <span className={classes.product__bold}>Material: </span>
          {material}
        </p>
        <p>
          <span className={classes.product__bold}>LxWxH [cm]: </span>
          {dimensions}
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
