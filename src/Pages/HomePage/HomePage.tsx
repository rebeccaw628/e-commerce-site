import { getFeatured } from "../../services/product-services";
import Carousel from "../../containers/Carousel/Carousel";
import { useState, useEffect } from "react";
import type { ProductDbResponse } from "../../services/product-services";
import ProductList from "../../Components/ProductList/ProductList";

const HomePage = () => {
  console.log(getFeatured());
  const [featured, setIsFeatured] = useState<ProductDbResponse[]>([]);
  useEffect(() => {
    getFeatured().then((data) => setIsFeatured(data));
  }, []);
  const featuredImgs = featured?.map((product) => product.variants[0].imgURL);

  console.log(featuredImgs);
  return (
    <div>
      homepage
      <Carousel imgs={featuredImgs} />
      {/* <ProductList /> */}
    </div>
  );
};

export default HomePage;
