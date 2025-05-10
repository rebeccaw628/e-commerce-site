import { createContext } from "react";
import useQuery from "../hooks/useQuery";
import { type useQueryParams } from "../hooks/useQuery";
import { getAllProducts } from "../services/product-services";
import { type ProductDbResponse } from "../services/product-services";
export const ProductsContext = createContext<ProductsContextType | null>(null);

interface ProductsContextType {
  productData: ProductDbResponse;
  error: string;
  isFail: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

interface Children {
  children: React.ReactNode;
}

export const ProductsProvider = ({ children }: Children) => {
  const {
    data: productData,
    error,
    isFail,
    isLoading,
    isSuccess,
  } = useQuery<ProductsContextType>({ fetchFn: getAllProducts});
  return (
    <ProductsContext
      value={{ productData, error, isFail, isLoading, isSuccess }}
    >
      {children}
    </ProductsContext>
  );
};
