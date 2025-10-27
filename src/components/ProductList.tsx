// src/components/ProductList.tsx
import { useNavigate } from "react-router-dom";
import products from "../data/products";
import { useProduct } from "../context/ProductContext";

export default function ProductList() {
  const { activeCategory, setSelectedProduct } = useProduct();
  const navigate = useNavigate();

  const items = products[activeCategory] || [];

  return (
    <section className="p-8">
      <h1 className="text-3xl font-light capitalize mb-8 text-gray-800">
        {activeCategory}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.length > 0 ? (
          items.map((product) => (
            <div
              key={product.id}
              className="rounded-lg shadow hover:shadow-lg transition p-4 bg-white cursor-pointer"
              onClick={() => {
                setSelectedProduct(product);
                navigate(`/product/${product.id}`);
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded"
              />
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
