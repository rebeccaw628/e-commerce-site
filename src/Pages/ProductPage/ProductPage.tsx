import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { ErrorObject } from "../DisplayPage/DisplayPage";
import { getProductById } from "../../services/product-services";
import type { ProductDbResponse } from "../../services/product-services";
import classes from "./ProductPage.module.scss";
import { ImSpinner2 } from "react-icons/im";

const DefaultProductDbResponseValues: ProductDbResponse = {
  id: "",
  title: "",
  category: "",
  subCategory: "",
  price: "",
  material: "",
  dimensions: "",
  isFeatured: false,
  variants: [],
};

const ProductPage = () => {
  const { id } = useParams();
  const [chosenVariant, setChosenVariant] = useState(0);
  const [productData, setProductData] = useState<ProductDbResponse>(
    DefaultProductDbResponseValues
  );
  const [error, setError] = useState<ErrorObject | null>(null);
  const [fetchStatus, setFetchStatus] = useState<
    "LOADING" | "SUCCESS" | "FAILURE" | "PENDING"
  >("PENDING");

  //   console.log(getProductById("29I8zdja46gqujD8T2vV"));

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

  const displayChosen = () => {
    setChosenVariant((prev) =>
      prev === productData.variants.length - 1 ? 0 : prev + 1
    );
  };

  return (
    // {fetchStatus === "SUCCESS" && (
    <>
      <div className={classes.product}>
        {fetchStatus === "LOADING" && <ImSpinner2 />}
        {fetchStatus === "FAILURE" && (
          <>
            <p>Failed to load products</p>
            <p>{error?.message}</p>
          </>
        )}
        {fetchStatus === "SUCCESS" && (
          <>
            <img
              src={productData.variants[chosenVariant].imgURL}
              alt={productData.category}
              className={classes.product__img}
            ></img>

            <div className={classes.product__text}>
              <h4>{productData.title}</h4>
              <h3>{productData.subCategory}</h3>
              <h3>${productData.price}</h3>
              <p>
                <span className={classes.product__bold}>Colour: </span>
                {productData.variants[chosenVariant].color}
              </p>
              {productData.variants.length > 1 && (
                <div className={classes.variants}>
                  {productData.variants.map((variant, index) => (
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

              <p>
                <span className={classes.product__bold}>Material: </span>
                {productData.material}
              </p>
              <p>
                <span className={classes.product__bold}>LxWxH [cm]: </span>
                {productData.dimensions}
              </p>
            </div>
          </>
        )}
      </div>
    </>
    // )}
  );
};

export default ProductPage;

//     setFetchStatus("LOADING");
//     if (!id) throw new Error("Product unavailable");
//     getProductById(id)
//       .then((result) => {
//         setFetchStatus("SUCCESS");
//         setProductData(result);
//       })
//       .catch((err) => {
//         setFetchStatus("FAILURE");
//         setError(err instanceof Error ? err : new Error(err));
//       });
//   }, []);

// return (
//     <>
//       {productData && (
//         <div className={classes.product}>
//           <img
//             src={productData.variants[chosenVariant].imgURL}
//             alt={productData.category}
//             className={classes.product__img}
//             // onClick={displayChosen}
//           ></img>

//           <div className={classes.product__text}>
//             <h4>{productData.title}</h4>
//             <h3>{productData.subCategory}</h3>
//             <h3>${productData.price}</h3>
//             {/* <p>
//               <span className={classes.product__bold}>Colour: </span>
//               {productData.variants}
//             </p> */}

//             {productData.variants.length > 1 && (
//               <div className={classes.variants}>
//                 {productData.variants.map((variant) => (
//                   <img
//                     key={productData.id}
//                     src={variant.imgURL}
//                     alt={productData.category}
//                     className={classes.variants__img}
//                   ></img>
//                 ))}
//               </div>
//             )}

//             <p>
//               <span className={classes.product__bold}>Material: </span>
//               {productData.material}
//             </p>
//             <p>
//               <span className={classes.product__bold}>LxWxH [cm]: </span>
//               {productData.dimensions}
//             </p>
//           </div>
//         </div>
//       )}
//     </>
//   );
