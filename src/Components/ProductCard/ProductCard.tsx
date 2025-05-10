import type { ProductDbResponse } from "../../services/product-services";
import classes from "./ProductCard.module.scss";
import { useNavigate } from "react-router";

interface ProductCardProps {
  productData: ProductDbResponse;
}

const ProductCard = ({ productData }: ProductCardProps) => {
  const navigate = useNavigate();
  const { variants, id, title, subCategory, price } = productData;
  // console.log(variants);
  const goToProduct = () => {
    navigate(`/products/${id}`);
  };

  return (
    <article className={classes.product} onClick={goToProduct}>
      <img
        className={classes.product__img}
        src={variants[0].imgURL}
        alt={productData.title}
      ></img>
      <div className={classes.product__details}>
        <h4 className={classes.product__title}>{title}</h4>
        <h3 className={classes.product__type}>{subCategory}</h3>
        <p className={classes.product__price}>${price}</p>
      </div>
    </article>
  );
};

export default ProductCard;
