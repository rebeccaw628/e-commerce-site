import { createContext, useState, useEffect } from "react";
import { checkStock, type Variant } from "../services/product-services";
import {
  type ProductDbResponse,
  updateStock,
} from "../services/product-services";

interface CartContextValues {
  cartItems: CartItem[];
  setCartItems: (cartsItems: CartItem[]) => unknown;
  addToCart: (productData: ProductDbResponse, color: string) => unknown;
  deleteFromCart: (cartItem: CartItem, change: number) => unknown;
  reduceQuantity: (cartItem: CartItem, change: number) => unknown;
  increaseQuantity: (cartItem: CartItem) => unknown;
}

const DefaultCartContextValues: CartContextValues = {
  cartItems: [],
  setCartItems: () => {},
  addToCart: () => {},
  deleteFromCart: () => {},
  reduceQuantity: () => {},
  increaseQuantity: () => {},
};

export const CartContext = createContext<CartContextValues>(
  DefaultCartContextValues
);

interface CartContextProviderProps {
  children?: React.ReactNode;
}

export interface CartItem {
  id: string;
  title: string;
  subCategory: string;
  price: number;
  color: string;
  quantity: number;
  imgURL: string;
}

const createCartItem = (
  productData: ProductDbResponse,
  quantity: number,
  color: string
) => {
  const { id, title, subCategory, price, variants } = productData;
  const chosenVariant = variants.find((v) => v.color === color) as Variant;

  return {
    id,
    title,
    subCategory,
    price,
    color,
    quantity,
    imgURL: chosenVariant.imgURL,
  };
};

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const getInitialCart = (): CartItem[] => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCart);

  const addToCart = async (productData: ProductDbResponse, color: string) => {
    const isAvailable = await checkStock(productData.id, color);
    console.log(isAvailable);
    if (isAvailable) {
      setCartItems((prevCart) => {
        // check if item already exists in cart
        const existingItem = prevCart.find(
          (item) => item.id === productData.id && item.color === color
        );
        // increment quantity if item already exists
        if (existingItem) {
          console.log("item alr exists - incremented");
          return prevCart.map((item) =>
            item.id === productData.id && item.color === color
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        // add item to cart if it doesn't already exist
        else {
          const newItem = createCartItem(productData, 1, color);
          console.log("item created", newItem);
          return [...prevCart, newItem];
        }
      });
      return true;
    } else {
      // setNoStockError("Item out of stock");
      return false;
    }
  };

  const deleteFromCart = async (cartItem: CartItem, change: number) => {
    console.log("item to delete", cartItem);
    await updateStock(cartItem, change); //updates firestock stock
    setCartItems((prevCart) => {
      const newCart = prevCart
        .map((item) =>
          item.id === cartItem.id && item.color === cartItem.color
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0);
      console.log("cart before:", prevCart);
      console.log("cart after:", newCart);
      return newCart;
    });
  };

  // reduce quantity of item from cart
  const reduceQuantity = async (cartItem: CartItem, change: number) => {
    console.log("reduceQuantity for:", cartItem);
    if (cartItem.quantity === 1) {
      //delete item from cart if only one item was in cart
      deleteFromCart(cartItem, change);
    } else {
      await updateStock(cartItem, change);
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.id === cartItem.id && item.color === cartItem.color
            ? { ...item, quantity: item.quantity + change }
            : item
        )
      );
    }
  };

  // increase quantity of item in cart
  const increaseQuantity = (cartItem: CartItem) => {
    console.log("item alr exists - incremented");
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === cartItem.id && item.color === cartItem.color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext
      value={{
        cartItems,
        setCartItems,
        addToCart,
        deleteFromCart,
        reduceQuantity,
        increaseQuantity,
      }}
    >
      {children}
    </CartContext>
  );
};

export default CartContextProvider;
