import { getAllProducts } from "../../services/product-services";
import DisplayPage from "../DisplayPage/DisplayPage";

const AllProductsPage = () => {
  return <DisplayPage fetchFn={getAllProducts} pageTitle="ALL PRODUCTS" />;
};

export default AllProductsPage;
