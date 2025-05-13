import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./containers/Navbar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import ChairsPage from "./Pages/ChairsPage/ChairsPage";
import TablesPage from "./Pages/TablesPage/TablesPage";
import ProductLoader from "./containers/ProductLoader/ProductLoader";
import AllProductsPage from "./Pages/AllProductsPage/AllProductsPage";
import CartPage from "./Pages/CartPage/CartPage";
import Logo from "./Components/Logo/Logo";
import SearchPageResults from "./Pages/SearchPageResults/SearchPageResults";
import CartProvider from "./context/CartProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <Logo />
        <Navbar />
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chairs" element={<ChairsPage />} />
            <Route path="/tables" element={<TablesPage />} />
            <Route path="/search/:searchTerm" element={<SearchPageResults />} />
            <Route path="/products/:id" element={<ProductLoader />} />
            <Route path="/allproducts" element={<AllProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
