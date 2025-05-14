import { getFeatured } from "../../services/product-services";
import Carousel from "../../containers/Carousel/Carousel";
import { useState, useEffect } from "react";
import type { ProductDbResponse } from "../../services/product-services";
import { Link } from "react-router";
import classes from "./HomePage.module.scss";
// import ProductCard from "../../Components/ProductCard/ProductCard";
import ProductList from "../../Components/ProductList/ProductList";

const HomePage = () => {
  const [featured, setFeatured] = useState<ProductDbResponse[]>([]);
  useEffect(() => {
    getFeatured().then((data) => setFeatured(data));
  }, []);
  // const featuredImgs = featured?.map((product) => product.variants[0].imgURL);

  // console.log(featuredImgs);
  return (
    <div className={classes.home}>
      <Carousel featured={featured} />
      <h4 className={classes.home__text}>
        bichonné: fussed over, because beauty deserves the fuss.
      </h4>
      <div className={classes.home__link}>
        <Link to={"/allproducts"}>SHOP NOW</Link>
      </div>
    </div>
  );
};

export default HomePage;
