import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Pages/HomePage.tsx/HomePage";
import ChairsPage from "./Pages/ChairsPage.tsx/ChairsPage";
import TablesPage from "./Pages/TablesPage.tsx/TablesPage";
import AllProductsPage from "./Pages/AllProductsPage.tsx/AllProductsPage";
import Logo from "./Components/Logo/Logo";

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
          <Route path="/allproducts" element={<AllProductsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
