// import { useParams } from "react-router";
// import { useEffect, useState, useContext } from "react";
// import type { ErrorObject } from "../../Pages/DisplayPage/DisplayPage";
// import {
//   getProductById,
//   type ProductDbResponse,
// } from "../../services/product-services";
// import { ProductContext } from "../../context/ProductProvider";
// import classes from "./ProductLoader.module.scss";
// import { ImSpinner2 } from "react-icons/im";
// import ProductPage from "../../Pages/ProductPage/ProductPage";
// import ProductProvider from "../../context/ProductProvider";

// const ProductLoader = () => {
//   const { id } = useParams();
//   const { product, setProduct } = useContext(ProductContext);

//   const [error, setError] = useState<ErrorObject | null>(null);
//   const [fetchStatus, setFetchStatus] = useState<
//     "LOADING" | "SUCCESS" | "FAILURE" | "PENDING"
//   >("PENDING");

//   //   console.log(getProductById("29I8zdja46gqujD8T2vV"));

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setFetchStatus("LOADING");
//       if (!id) {
//         setFetchStatus("FAILURE");
//         setError(new Error("Product unavailable"));
//         return;
//       }
//       try {
//         const result = await getProductById(id);
//         setFetchStatus("SUCCESS");
//         setProduct(result);
//       } catch (err) {
//         const error = err instanceof Error ? err : new Error(String(err));
//         setFetchStatus("FAILURE");
//         setError(error);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   return (
//     <>
//       {fetchStatus === "LOADING" && <ImSpinner2 />}
//       {fetchStatus === "FAILURE" && (
//         <>
//           <p>Failed to load products</p>
//           <p>{error?.message}</p>
//         </>
//       )}
//       {fetchStatus === "SUCCESS" && <ProductPage productData={product} />}
//     </>
//   );
// };

// export default ProductLoader;
