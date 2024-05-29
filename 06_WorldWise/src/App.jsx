import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";

// import pages
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/app/CityList";
import CountryList from "./components/app/CountryList";
import City from "./components/app/City";
import Form from "./components/app/Form";

// App routing
function App() {
  return (
    <BrowserRouter>
      <CitiesProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<CityList />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
        </Routes>
      </CitiesProvider>
    </BrowserRouter>
  );
}

export default App;
