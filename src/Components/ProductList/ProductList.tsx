import classes from "./ProductList.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import type { ProductDbResponse } from "../../services/product-services";

interface ProductListProps {
  products: ProductDbResponse[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className={classes.productGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} productData={product} />
      ))}
    </div>
  );
};

export default ProductList;
