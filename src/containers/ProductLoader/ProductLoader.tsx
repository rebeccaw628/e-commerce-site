import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { type ErrorObject } from "../../Pages/DisplayPage/DisplayPage";
import {
  getProductById,
  type ProductDbResponse,
} from "../../services/product-services";

import { ImSpinner2 } from "react-icons/im";
import ProductPage from "../../Pages/ProductPage/ProductPage";

const DefaultProductDbResponseValues: ProductDbResponse = {
  id: "",
  title: "",
  category: "",
  subCategory: "",
  price: 0,
  material: "",
  dimensions: "",
  isFeatured: false,
  favourited: false,
  variants: [],
};

const ProductLoader = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState<ProductDbResponse>(
    DefaultProductDbResponseValues
  );
  const [error, setError] = useState<ErrorObject | null>(null);
  const [fetchStatus, setFetchStatus] = useState<
    "LOADING" | "SUCCESS" | "FAILURE" | "PENDING"
  >("PENDING");

  useEffect(() => {
    const fetchProduct = async () => {
      setFetchStatus("LOADING");
      if (!id) {
        setFetchStatus("FAILURE");
        setError(new Error("Product unavailable"));
        return;
      }
      try {
        const result = await getProductById(id);
        setFetchStatus("SUCCESS");
        setProductData(result);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setFetchStatus("FAILURE");
        setError(error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      {fetchStatus === "LOADING" && <ImSpinner2 />}
      {fetchStatus === "FAILURE" && (
        <>
          <p>Failed to load products</p>
          <p>{error?.message}</p>
        </>
      )}
      {fetchStatus === "SUCCESS" && <ProductPage productData={productData} />}
    </>
  );
};

export default ProductLoader;
