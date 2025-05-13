import { getItemByCategory } from "../../services/product-services";
import DisplayPage from "../DisplayPage/DisplayPage";

const TablesPage = () => {
  return (
    <DisplayPage
      fetchFn={() => getItemByCategory("Table")}
      pageTitle="TABLES"
    />
  );
};

export default TablesPage;
