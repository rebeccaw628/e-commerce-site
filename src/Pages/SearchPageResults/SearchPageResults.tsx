import { useParams } from "react-router";

const SearchPageResults = () => {
  const { searchTerm } = useParams();
  return <div>SearchPageResults</div>;
};

export default SearchPageResults;
