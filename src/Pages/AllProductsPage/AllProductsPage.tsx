import { getAllProducts } from "../../services/product-services";

import DisplayPage from "../DisplayPage/DisplayPage";

const AllProductsPage = () => {
  // console.log(getAllProducts);
  return <DisplayPage fetchFn={getAllProducts} pageTitle="ALL PRODUCTS" />;
};

export default AllProductsPage;

// import { getAllProducts } from "../../services/product-services";
// import ProductList from "../../Components/ProductList/ProductList";
// import { type ProductDbResponse } from "../../services/product-services";
// import { useState, useEffect } from "react";
// import classes from "./AllProductsPage.module.scss";

// const AllProductsPage = () => {
//   const [productData, setProductData] = useState<ProductDbResponse[]>([]);
//   useEffect(() => {
//     getAllProducts().then((result) => setProductData(result));
//   }, []);

//   // console.log(paginate());

//   return (
//     <div className={classes.productsPage}>
//       <h2>ALL PRODUCTS</h2>
//       <h4 className={classes.productsDisplay}>
//         Showing {productData.length} results
//       </h4>
//       <ProductList products={productData} />
//     </div>
//   );
// };
