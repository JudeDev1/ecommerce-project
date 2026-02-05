// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";

export default function App() {
  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* Persistent Navbar */}
            <Navbar />

            {/* Main Routes */}
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </main>
          </div>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
}
/*
const button = ({ children }) => {
  return <button>{children}</button>;

  const domElement = document.getElementbyId("root")

  ReactDOM.render(
    <>
      <button>
        + Add
      </button>
      <button>
        -Subtract
      </button>
    </>
  )
}
*/

/*
  Function Layout({ children }) {
    <header>Header</header>
    <main>{children}</main>
    <footer>Footer</footer>

    function App() {
      return (
        <Layout>
          <h1>Dashboard</h1>
          <p>Welcome back, User</p>
        </Layout>
      )
    }
  }
*/