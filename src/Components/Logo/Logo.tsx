import { Link } from "react-router";
import classes from "./Logo.module.scss";

const Logo = () => {
  return (
    <>
      <Link className={classes.logo} to="/">
        <h1>bichonné</h1>
      </Link>
    </>
  );
};

export default Logo;
