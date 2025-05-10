// import { paginate } from "../../services/product-services";
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
  const [productData, setProductData] = useState<ProductDbResponse[]>([]);
  const [error, setError] = useState<ErrorObject | null>(null);
  const [fetchStatus, setFetchStatus] = useState<
    "LOADING" | "SUCCESS" | "FAILURE" | "PENDING"
  >("PENDING");
  // console.log(fetchFn);

  useEffect(() => {
    setFetchStatus("LOADING");
    fetchFn()
      .then((result) => {
        setFetchStatus("SUCCESS");
        setProductData(result);
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
              Showing {productData.length} results
            </h4>
          </div>
          <ProductList products={productData} />
        </>
      )}
    </div>
  );
};

export default DisplayPage;
