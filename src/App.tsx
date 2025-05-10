import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./containers/Navbar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import ChairsPage from "./Pages/ChairsPage/ChairsPage";
import TablesPage from "./Pages/TablesPage/TablesPage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import AllProductsPage from "./Pages/AllProductsPage/AllProductsPage";
import CartPage from "./Pages/CartPage/CartPAge";
import Logo from "./Components/Logo/Logo";
import SearchPageResults from "./Pages/SearchPageResults/SearchPageResults";

function App() {
  return (
    <>
      <BrowserRouter>
        <Logo />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chairs" element={<ChairsPage />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/search/:searchTerm" element={<SearchPageResults />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
