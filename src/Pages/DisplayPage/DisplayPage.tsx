import ProductList from "../../Components/ProductList/ProductList";
import { type ProductDbResponse } from "../../services/product-services";
import { useState, useEffect } from "react";
import classes from "./DisplayPage.module.scss";
import { ImSpinner2 } from "react-icons/im";

interface DisplayPageProps {
  fetchFn: () => Promise<ProductDbResponse[]>;
  pageTitle: string;
}

export interface ErrorObject {
  name: string;
  message: string;
}

const DisplayPage = ({ fetchFn, pageTitle }: DisplayPageProps) => {
  const [productsData, setProductsData] = useState<ProductDbResponse[]>([]);
  const [error, setError] = useState<ErrorObject | null>(null);
  const [fetchStatus, setFetchStatus] = useState<
    "LOADING" | "SUCCESS" | "FAILURE" | "PENDING"
  >("PENDING");

  useEffect(() => {
    setFetchStatus("LOADING");
    fetchFn()
      .then((result) => {
        setFetchStatus("SUCCESS");
        setProductsData(result);
      })
      .catch((err) => {
        setFetchStatus("FAILURE");
        setError(err);
      });
  }, []);

  return (
    <div className={classes.displayPage}>
      {fetchStatus === "LOADING" && <ImSpinner2 />}
      {fetchStatus === "FAILURE" && (
        <>
          <p>Failed to load products</p>
          <p>{error?.message}</p>
        </>
      )}
      {fetchStatus === "SUCCESS" && (
        <>
          <div className={classes.displaySubheading}>
            <h2>{pageTitle}</h2>
            <h4 className={classes.chairsDisplay}>
              Showing {productsData.length} results
            </h4>
          </div>
          <ProductList products={productsData} />
        </>
      )}
    </div>
  );
};

export default DisplayPage;
