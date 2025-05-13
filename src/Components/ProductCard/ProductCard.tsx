import { type ProductDbResponse } from "../../services/product-services";
import classes from "./ProductCard.module.scss";
import { Link } from "react-router";

interface ProductCardProps {
  product: ProductDbResponse;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // const { product, setProduct } = useContext(ProductContext);
  const { variants, id, title, subCategory, price } = product;

  // const handleFavourite = async (
  //   product: ProductDbResponse,
  //   id: string,
  //   favourited: boolean
  // ) => {
  //   console.log("fav button clicked");
  //   await updateFavourite(id, favourited);
  //   console.log("fave status after update:", favourited);
  // };

  return (
    <article className={classes.product}>
      <div className={classes.product__img_container}>
        <Link to={`/products/${id}`}>
          <img
            className={classes.product__img}
            src={variants[0].imgURL}
            alt={title}
          ></img>
        </Link>
        {/* {favourited ? (
          <FaHeart
            className={classes.product__favourite}
            onClick={() => handleFavourite(product, id, favourited)}
          />
        ) : (
          <FaRegHeart
            className={classes.product__favourite}
            onClick={() => handleFavourite(product, id, favourited)}
          />
        )} */}
      </div>
      <div className={classes.product__details}>
        <Link to={`/products/${id}`}>
          <h4 className={classes.product__title}>{title}</h4>
          <h3 className={classes.product__type}>{subCategory}</h3>
          <p className={classes.product__price}>${price}</p>
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
