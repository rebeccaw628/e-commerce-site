import { getTables } from "../../services/product-services";

import DisplayPage from "../DisplayPage/DisplayPage";

const TablesPage = () => {
  //   console.log(getTables);
  return <DisplayPage fetchFn={getTables} pageTitle="TABLES" />;
};

export default TablesPage;
