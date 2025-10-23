// src/components/CartPage.tsx
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";
import { useState } from "react";
import woman1 from "../assets/grey.png";
import wayfarer from "../assets/wayfarer.png";

interface CartPageProps {
  onGoBack: () => void;
}

export default function CartPage({ onGoBack }: CartPageProps) {
  const { clearCart } = useCart();
  const { setSelectedProduct } = useProduct();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Apollo Running Short",
      price: 50,
      size: "M",
      sizes: ["XS", "S", "M", "XL"],
      colors: ["Gray", "Black", "Green"],
      image: woman1,
      quantity: 1,
    },
    {
      id: 2,
      name: "Jupiter Wayfarer",
      price: 75,
      size: "S",
      sizes: ["S", "M"],
      colors: ["Black", "Light Blue", "Orange"],
      image: wayfarer,
      quantity: 2,
    },
  ]);

  const increaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = (total * 0.21).toFixed(2);
  const quantity = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <section className="p-8 flex flex-col gap-10">
      <h1 className="text-3xl font-bold mb-4 uppercase">Cart</h1>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col md:flex-row justify-between items-start border-b border-gray-400 pb-6"
        >
          {/* Left Side */}
          <div className="flex-1">
            <h2 className="text-xl font-bold leading-tight">
              {item.name.split(" ")[0]}
            </h2>
            <p className="text-lg font-light">
              {item.name.split(" ").slice(1).join(" ")}
            </p>
            <p className="text-lg font-semibold mt-2">
              ${item.price.toFixed(2)}
            </p>

            {/* Sizes */}
            <div className="mt-4">
              <h3 className="font-semibold uppercase mb-2 text-sm">Size:</h3>
              <div className="flex space-x-2">
                {item.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-3 py-1 border text-sm ${
                      size === item.size
                        ? "bg-black text-white border-black"
                        : "border-gray-400 hover:bg-black hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mt-4">
              <h3 className="font-semibold uppercase mb-2 text-sm">Color:</h3>
              <div className="flex space-x-2">
                {item.colors.map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8 border-2 ${
                      color === item.color
                        ? "border-gray-500 scale-110"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor:
                        color === "Gray"
                          ? "#808080"
                          : color === "Black"
                          ? "#000000"
                          : color === "Green"
                          ? "#228B22"
                          : color === "Light Blue"
                          ? "#87CEFA"
                          : color === "Orange"
                          ? "#FFA500"
                          : "#FFFFFF",
                      borderRadius: "0.25rem",
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <div className="flex flex-col items-center">
              <button
                onClick={() => increaseQty(item.id)}
                className="px-2 py-1 border text-lg hover:bg-gray-200"
              >
                +
              </button>
              <span className="my-2 font-semibold">{item.quantity}</span>
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-2 py-1 border text-lg hover:bg-gray-200"
              >
                −
              </button>
            </div>
            <img
              src={item.image}
              alt={item.name}
              className="w-40 h-40 object-cover rounded-md shadow-md"
            />
          </div>
        </div>
      ))}

      {/* Summary */}
      <div className="mt-10 border-t border-gray-400 pt-6 text-lg font-medium">
        <p>
          Tax 21%: <span className="font-semibold">${tax}</span>
        </p>
        <p>
          Quantity: <span className="font-semibold">{quantity}</span>
        </p>
        <p>
          Total: <span className="font-semibold">${total.toFixed(2)}</span>
        </p>

        <button className="mt-6 bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition">
          ORDER
        </button>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={onGoBack}
          className="text-gray-600 hover:underline"
        >
          ← Continue Shopping
        </button>
        <button
          onClick={clearCart}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
      </div>
    </section>
  );
}
