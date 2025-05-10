import { getChairs } from "../../services/product-services";

import DisplayPage from "../DisplayPage/DisplayPage";

const ChairsPage = () => {
  console.log(getChairs());
  return <DisplayPage fetchFn={getChairs} pageTitle="CHAIRS" />;
};

export default ChairsPage;

// import ProductList from "../../Components/ProductList/ProductList";
// import { type ProductDbResponse } from "../../services/product-services";
// import { useState, useEffect } from "react";
// import classes from "./ChairsPage.module.scss";

// const ChairsPage = () => {
//   const [productData, setProductData] = useState<ProductDbResponse[]>([]);
//   useEffect(() => {
//     getProductByCategory("Chair").then((result) => setProductData(result));
//     console.log("fetched");
//   }, []);

//   // console.log(paginate());

//   return (
//     <div className={classes.chairsPage}>
//       <div className={classes.chairsSubheading}>
//         <h2>CHAIRS</h2>
//         <h4 className={classes.chairsDisplay}>
//           Showing {productData.length} results
//         </h4>
//       </div>
//       <ProductList products={productData} />
//     </div>
//   );
// };

// export default ChairsPage;
