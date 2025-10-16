import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList"; 
import { ProductProvider } from "./context/ProductContext";

export default function App() {
  return (
    <ProductProvider>
      <Navbar />
      <ProductList />
    </ProductProvider>
  );
}
