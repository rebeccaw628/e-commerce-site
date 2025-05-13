import { useState } from "react";
import classes from "./Carousel.module.scss";

interface CarouselProps {
  imgs: string[];
}

const Carousel = ({ imgs }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === imgs.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? imgs.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={classes.carousel}>
      <img
        src={imgs[activeIndex]}
        alt={"Featured Product"}
        className={classes.carousel__img}
      />
      <div className={classes.carousel__btn_wrapper}>
        <button onClick={nextSlide} className={classes.carousel__btn}>
          &#10094;
        </button>
        <button onClick={prevSlide} className={classes.carousel__btn}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
