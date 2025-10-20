import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import { ProductProvider, useProduct } from "./context/ProductContext";

function MainContent() {
  const { selectedProduct } = useProduct();
  return selectedProduct ? <ProductDetail /> : <ProductList />;
}

export default function App() {
  return (
    <ProductProvider>
      <Navbar />
      <MainContent />
    </ProductProvider>
  );
}
