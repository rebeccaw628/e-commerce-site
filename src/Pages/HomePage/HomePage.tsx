import { getFeatured } from "../../services/product-services";
import Carousel from "../../containers/Carousel/Carousel";
import { useState, useEffect } from "react";
import type { ProductDbResponse } from "../../services/product-services";
import { Link } from "react-router";
import classes from "./HomePage.module.scss";

const HomePage = () => {
  const [featured, setIsFeatured] = useState<ProductDbResponse[]>([]);
  useEffect(() => {
    getFeatured().then((data) => setIsFeatured(data));
  }, []);
  const featuredImgs = featured?.map((product) => product.variants[0].imgURL);

  console.log(featuredImgs);
  return (
    <div className={classes.home}>
      <Carousel imgs={featuredImgs} />
      <h4 className={classes.home__text}>Timeless elegance</h4>
      <div className={classes.home__link}>
        <Link to={"/allproducts"}>SEE MORE</Link>
      </div>
    </div>
  );
};

export default HomePage;
