import classes from "./SearchBar.module.scss";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  return (
    <form className={classes.form}>
      <input
        type="search"
        id="searchInput"
        className={classes.searchBar}
        name="searchTerm"
        placeholder="Search"
      />
      <button type="submit" className={classes.searchBtn}>
        <IoSearch className={classes.icon} />
      </button>
    </form>
  );
};

export default SearchBar;
