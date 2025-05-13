//NOT IN USE

import { createContext, useState } from "react";
import {
  type ProductDbResponse,
  updateFavourite,
} from "../services/product-services";

interface ProductContextValues {
  productsData: ProductDbResponse[];
  setProductsData: (products: ProductDbResponse[]) => unknown;
  handleFavourite: (id: string, favourited: boolean) => unknown;
}

const DefaultProductContextValues: ProductContextValues = {
  productsData: [],
  setProductsData: () => {},
  handleFavourite: () => {},
};

export const ProductContext = createContext<ProductContextValues>(
  DefaultProductContextValues
);

interface ProductProviderProps {
  children?: React.ReactNode;
}

const ProductProvider = ({ children }: ProductProviderProps) => {
  const [productsData, setProductsData] = useState<ProductDbResponse[]>([]);

  const handleFavourite = async (
    // product: ProductDbResponse,
    id: string,
    favourited: boolean
  ) => {
    console.log("fav button clicked");
    await updateFavourite(id, favourited);
    console.log("fave status after update:", favourited);
    setProductsData((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, favourited: !favourited } : product
      )
    );
  };

  return (
    <ProductContext value={{ productsData, setProductsData, handleFavourite }}>
      {children}
    </ProductContext>
  );
};

export default ProductProvider;
