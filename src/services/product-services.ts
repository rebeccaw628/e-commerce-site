import { db } from "../../config/firestore";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  or,
  updateDoc,
} from "firebase/firestore";
import { type CartItem } from "../context/CartProvider";

export interface Variant {
  color: string;
  imgURL: string;
  stock: number;
  initialStock: number;
}

export interface ProductDbResponse {
  id: string;
  title: string;
  category: string;
  subCategory: string;
  price: number;
  material: string;
  dimensions: string;
  isFeatured: boolean;
  favourited: boolean;
  variants: Variant[];
}

export const getAllProducts = async () => {
  const collectionRef = collection(db, "products");
  const querySnapshot = await getDocs(collectionRef);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ProductDbResponse)
  );
};

export const getChairs = async () => {
  const collectionRef = collection(db, "products");
  const categoryQ = query(collectionRef, where("category", "==", "Chair"));
  const querySnapshot = await getDocs(categoryQ);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ProductDbResponse)
  );
};

export const getTables = async () => {
  const collectionRef = collection(db, "products");
  const categoryQ = query(collectionRef, where("category", "==", "Table"));
  const querySnapshot = await getDocs(categoryQ);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ProductDbResponse)
  );
};

export const getFeatured = async () => {
  const collectionRef = collection(db, "products");
  const featuredQ = query(collectionRef, where("isFeatured", "==", true));
  const querySnapshot = await getDocs(featuredQ);
  // console.log(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ProductDbResponse)
  );
};

export const getProductById = async (id: string) => {
  const docRef = doc(db, "products", id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    throw new Error("Could not find product with id " + id);
  }
  return { id: snapshot.id, ...snapshot.data() } as ProductDbResponse;
};

export const updateFavourite = async (id: string, favourited: boolean) => {
  console.log("fav status before fave/unfave:", favourited);
  const docRef = doc(db, "products", id);
  await updateDoc(docRef, { favourited: !favourited });
};

export const createCartItem = (
  productData: ProductDbResponse,
  quantity = 1,
  color: string
) => {
  const { title, category, price, variants } = productData;
  const imgURL = variants.find((v) => v.color === color);
  // quantity++;
  return {
    title,
    category,
    price,
    color,
    quantity,
    subtotal: price * quantity,
    imgURL: imgURL,
  };
};

export const checkStock = async (
  id: string,
  color: string
  // change: number,
): Promise<boolean> => {
  // const collectionRef = collection(db, "carts");
  console.log("checking stock for:", id, color);
  const productRef = doc(db, "products", id);
  const productData = (await getDoc(productRef)).data() as ProductDbResponse;
  // const { variants } = productData;
  const variants = [...productData.variants];
  console.log(variants);
  // const liveStock = [...variants];
  const variantIndex = variants.findIndex((v) => v.color === color);

  if (variants[variantIndex].stock > 0) {
    console.log("stock before changes:", variants[variantIndex].stock);
    variants[variantIndex].stock -= 1;
    console.log(
      `stock after changes: ${variants[variantIndex].stock}, - should decrease since item added to cart`
    );
    await updateDoc(productRef, { variants });
    console.log("Checked and reduced inventory");
    console.log(variants);
    return true;
  } else {
    return false;
  }
};

export const resetData = async (cartItems: CartItem[]) => {
  for (const item of cartItems) {
    const productRef = doc(db, "products", item.id);
    const productData = (await getDoc(productRef)).data() as ProductDbResponse;
    const { variants } = productData;
    const resetVariants = variants.map((variant) => {
      if (variant.color === item.color) {
        return { ...variant, stock: variant.initialStock };
      }
      return variant;
    });
    await updateDoc(productRef, { variants: resetVariants });
  }
};

// when single item is deleted from cart
export const resetItemStock = async (cartItem: CartItem) => {
  const productRef = doc(db, "products", cartItem.id);
  const productData = (await getDoc(productRef)).data() as ProductDbResponse;
  const { variants } = productData;
  const resetStock = variants.map((variant) => {
    if (variant.color === cartItem.color) {
      return { ...variant, stock: variant.initialStock };
    }
    return variant;
  });
  await updateDoc(productRef, { variants: resetStock });
};

//TEST
export const updateStock = async (cartItem: CartItem, change: number) => {
  const productRef = doc(db, "products", cartItem.id);
  const productData = (await getDoc(productRef)).data() as ProductDbResponse;
  // const { variants } = productData;

  // const variantIndex = variants.findIndex((v) => v.color === color);
  const variants = [...productData.variants];
  // const variantIndex = variants.findIndex((v) => v.color === color);
  const updatedVariants = variants.map((variant) => {
    if (variant.color === cartItem.color) {
      console.log(
        `item: ${cartItem}, stock before item removed from cart: ${variant.stock}`
      );
      const newStock = variant.stock - change;
      console.log(
        `item: ${cartItem}, stock after item removed from cart: ${newStock}`
      );
      return { ...variant, stock: newStock };
    }
    return variant;
  });
  await updateDoc(productRef, { variants: updatedVariants });

  console.log("variant stock updated");
};

//

// to implement in future
export const searchProducts = async (searchTerm: string) => {
  const collectionRef = collection(db, "products");
  const searchQ = query(
    collectionRef,
    or(
      where("category", "in", [searchTerm]),
      where("subcategory", "in", [searchTerm]),
      where("material", "in", [searchTerm]),
      where("variants", "array-contains-any", [searchTerm])
    )
  );
  const querySnapshot = await getDocs(searchQ);
  console.log(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
};

//UNMODIFED ORIGINAL
// export const updateStock = async (cartItem: CartItem) => {
//   const productRef = doc(db, "products", cartItem.id);
//   const productData = (await getDoc(productRef)).data() as ProductDbResponse;
//   // const { variants } = productData;

//   // const variantIndex = variants.findIndex((v) => v.color === color);
//   const variants = [...productData.variants];
//   // const variantIndex = variants.findIndex((v) => v.color === color);
//   const updatedVariants = variants.map((variant) => {
//     if (variant.color === cartItem.color) {
//       console.log(
//         `item: ${cartItem}, stock before item removed from cart: ${variant.stock}`
//       );
//       const newStock = variant.stock + 1;
//       console.log(
//         `item: ${cartItem}, stock after item removed from cart: ${newStock}`
//       );
//       return { ...variant, stock: newStock };
//     }
//     return variant;
//   });
//   await updateDoc(productRef, { variants: updatedVariants });

//   console.log("variant stock updated");
// };
