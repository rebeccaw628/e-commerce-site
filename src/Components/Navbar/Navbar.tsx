import { NavLink } from "react-router";
import classes from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={classes.nav}>
      <NavLink className={classes.nav__link} to="/chairs">
        CHAIRS
      </NavLink>
      <NavLink className={classes.nav__link} to="/tables">
        TABLES
      </NavLink>
      <NavLink className={classes.nav__link} to="/allproducts">
        SHOP ALL
      </NavLink>
    </nav>
  );
};

export default Navbar;
