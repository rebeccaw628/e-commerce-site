import { useState } from "react";
import classes from "./Carousel.module.scss";
import { type ProductDbResponse } from "../../services/product-services";

interface CarouselProps {
  featured: ProductDbResponse[];
}

const Carousel = ({ featured }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === featured.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? featured.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={classes.carousel}>
      <div className={classes.carousel__display}>
        <div
          className={classes.carousel__imgs}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }} //moves image to the left/right by exactly one image width at a time
        >
          {featured.map((product) => (
            <img
              key={product.id}
              src={product.variants[0].imgURL}
              alt={"Featured Product"}
              className={classes.carousel__img}
            />
          ))}
        </div>
      </div>
      <div className={classes.carousel__btn_wrapper}>
        <button onClick={prevSlide} className={classes.carousel__btn}>
          &#10094;
        </button>
        <button onClick={nextSlide} className={classes.carousel__btn}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
