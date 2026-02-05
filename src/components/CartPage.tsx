// src/components/CartPage.tsx
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = (total * 0.21).toFixed(2);
  const quantity = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <section className="p-8 flex flex-col gap-10">
      <h1 className="text-3xl font-bold mb-4 uppercase">Cart</h1>

      {/* Empty Cart Message */}
      {items.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row justify-between items-start border-b border-gray-400 pb-6"
          >
            {/* Left Side */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold leading-tight">
                  {item.name.split(" ")[0]}
                </h2>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>

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
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 border text-sm ${
                        size === "M"
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
                  {["Gray", "Black", "Green"].map((color) => (
                    <div
                      key={color}
                      className="w-8 h-8 border-2 border-gray-300 rounded"
                      style={{
                        backgroundColor:
                          color === "Gray"
                            ? "#808080"
                            : color === "Black"
                              ? "#000000"
                              : "#228B22",
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
                  onClick={() => increaseQuantity(item.id)}
                  className="px-2 py-1 border text-lg hover:bg-gray-200"
                >
                  +
                </button>
                <span className="my-2 font-semibold">{item.quantity}</span>
                <button
                  onClick={() => decreaseQuantity(item.id)}
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
        ))
      )}

      {/* Summary */}
      {items.length > 0 && (
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
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:underline"
        >
          ← Continue Shopping
        </button>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
        )}
      </div>
    </section>
  );
}
