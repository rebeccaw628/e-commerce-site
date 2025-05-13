import { NavLink, useNavigate } from "react-router";
import classes from "./Navbar.module.scss";
// import SearchBar from "../../Components/SearchBar/SearchBar";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  // const handleSubmit = () => {};
  return (
    <nav className={classes.nav}>
      <div className={classes.nav__links}>
        <NavLink className={classes.nav__link} to="/chairs">
          CHAIRS
        </NavLink>
        <NavLink className={classes.nav__link} to="/tables">
          TABLES
        </NavLink>
        <NavLink className={classes.nav__link} to="/allproducts">
          SHOP ALL
        </NavLink>
        <NavLink to="/cart">
          <FaShoppingCart className={classes.nav__cart} />
        </NavLink>
      </div>
      {/* <div className={classes.nav__search}>
        <SearchBar onSubmit={handleSubmit} />
      </div> */}
    </nav>
  );
};

export default Navbar;
