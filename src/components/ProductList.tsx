// src/components/ProductList.tsx
import { useNavigate } from "react-router-dom";
import products from "../data/products";
import { useProduct } from "../context/ProductContext";

// Define the Product type
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

type Category = "WOMEN" | "MEN" | "KIDS";

export default function ProductList() {
  const { activeCategory, setSelectedProduct } = useProduct();
  const navigate = useNavigate();

  // Type assertion for safe indexing
  const items: Product[] = products[activeCategory as Category] || [];

  return (
    <section className="p-8">
      <h1 className="text-3xl font-light capitalize mb-8 text-gray-800">
        {activeCategory}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.length > 0 ? (
          items.map((product: Product) => (
            <div
              key={product.id}
              className={`relative rounded-lg shadow hover:shadow-lg transition p-4 bg-white ${
                product.inStock ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={() => {
                if (product.inStock) {
                  setSelectedProduct(product);
                  navigate(`/products/${product.id}`);
                }
              }}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-64 object-cover rounded ${
                    !product.inStock ? "opacity-60 grayscale" : ""
                  }`}
                />

                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
                    <span className="text-white text-lg font-semibold">
                      OUT OF STOCK
                    </span>
                  </div>
                )}
              </div>

              <h3 className="mt-3 text-lg font-light">{product.name}</h3>
              <p className="font-medium mt-1">${product.price.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products available.
          </p>
        )}
      </div>
    </section>
  );
}
