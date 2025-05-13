import { getItemByCategory } from "../../services/product-services";
import DisplayPage from "../DisplayPage/DisplayPage";

const ChairsPage = () => {
  return (
    <DisplayPage
      fetchFn={() => getItemByCategory("Chair")}
      pageTitle="CHAIRS"
    />
  );
};

export default ChairsPage;
