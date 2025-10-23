import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import { ProductProvider, useProduct } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

function MainContent() {
  const { selectedProduct, setSelectedProduct } = useProduct();
  const [showCart, setShowCart] = useState(false);

  // Open Cart from Overlay requests
  useEffect(() => {
    const openCart = () => setShowCart(true);
    window.addEventListener("openCartPage", openCart);
    return () => window.removeEventListener("openCartPage", openCart);
  }, []);

  // Show CartPage if showCart is true
  if (showCart) {
    return (
      <CartPage
        onGoBack={() => {
          setShowCart(false);
          setSelectedProduct(null);
        }}
      />
    );
  }

  // Show Product Detail if a product is selected
  if (selectedProduct) {
    return (
      <ProductDetail
        onGoToCart={() => setShowCart(true)} 
        onGoBack={() => setSelectedProduct(null)} // Back to Product List
      />
    );
  }

  // Default
  return <ProductList />;
}

export default function App() {
  return (
    <CartProvider>
      <ProductProvider>
        <Navbar />
        <MainContent />
      </ProductProvider>
    </CartProvider>
  );
}
