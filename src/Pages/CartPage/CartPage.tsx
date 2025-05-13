import classes from "./CartPage.module.scss";
import { CartContext } from "../../context/CartProvider";
import { useContext } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { type CartItem } from "../../context/CartProvider";
import {
  checkStock,
  resetData,
  resetItemStock,
} from "../../services/product-services";
import { Fragment } from "react";
import Button from "react-bootstrap/Button";

const CartPage = () => {
  const { cartItems, setCartItems, deleteFromCart, increaseQuantity } =
    useContext(CartContext);

  console.log("current cart", cartItems);

  const handleIncrease = async (item: CartItem) => {
    console.log("increase btn clicked", item);
    const canIncrease = await checkStock(item.id, item.color);
    console.log("checkStock returned", canIncrease);
    if (canIncrease) {
      increaseQuantity(item);
    } else {
      console.log("Out of stock");
    }
  };

  const clearCart = async (cartItems: CartItem[]) => {
    setCartItems([]);
    localStorage.removeItem("cart");
    await resetData(cartItems);
  };

  const handleDecrease = async (item: CartItem, change: number) => {
    console.log("decrease btn clicked for:", item);
    console.log(
      `item: ${item.id}, ${item.color} qty in cart before removal: ${item.quantity}`
    );
    await deleteFromCart(item, change);
    if (item.quantity + change === 0) {
      await resetItemStock(item);
    }
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <div className={classes.cart_container}>
          <div className={classes.cart}>
            <h2>Shopping Cart</h2>
            <div className={classes.cart__subheadings}>
              <h3 className={classes.cart__product}>Product</h3>
              <div className={classes.cart__calcs}>
                <h3>Price</h3>
                <h3>Quantity</h3>
                <h3>Subtotal</h3>
              </div>
            </div>
          </div>
          <div className={classes.list}>
            {cartItems.map((item) => (
              <Fragment key={`${item.id}-${item.color}`}>
                <div className={classes.item}>
                  <div className={classes.item_details}>
                    <img className={classes.item__img} src={item.imgURL}></img>
                    <div className={classes.item__info}>
                      <h4>{item.title}</h4>
                      <h4>{item.subCategory}</h4>
                      <h4>{item.color}</h4>
                    </div>
                  </div>
                  <div className={classes.amounts}>
                    <p>${item.price}</p>
                    <div className={classes.amounts__qty}>
                      <Button
                        variant="secondary"
                        onClick={() => handleDecrease(item, -1)}
                      >
                        -
                      </Button>
                      <p>{item.quantity}</p>
                      <Button
                        variant="secondary"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteFromCart(item, -item.quantity)}
                      >
                        <MdOutlineDelete className={classes.amounts__delete} />
                      </Button>
                    </div>
                    <p className={classes.cart__subtotal}>
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
              </Fragment>
            ))}
            <div className={classes.total}>
              <h2>Cart Total</h2>
              <div className={classes.total_wrapper}>
                <h3>
                  $
                  {cartItems.reduce(
                    (total, item) => (total += item.quantity * item.price),
                    0
                  )}
                </h3>
                <div className={classes.btns_wrapper}>
                  <button className={classes.checkout}>CHECKOUT</button>
                  <button
                    onClick={() => clearCart(cartItems)}
                    className={classes.clear}
                  >
                    Clear cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className={classes.empty}>
          Your cart is currently empty. Get shopping!
        </p>
      )}
    </>
  );
};

export default CartPage;
