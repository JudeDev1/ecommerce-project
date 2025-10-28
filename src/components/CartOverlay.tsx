import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartOverlay() {
  const { items, total, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleViewBag = () => {
    setIsCartOpen(false);
    navigate("/cart");
  };

  return (
    <div className="bg-white shadow-xl rounded-lg w-80 p-4 border border-gray-200">
      <h2 className="text-lg font-semibold mb-3">
        My Bag, {items.length} {items.length === 1 ? "item" : "items"}
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">
          Your cart is empty
        </p>
      ) : (
        <>
          <div className="max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-3 border-b pb-2"
              >
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
              </div>
            ))}
          </div>

          {/* Show only when items exist */}
          <div className="flex justify-between items-center mt-3">
            <span className="font-semibold text-sm">Total</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>

          <div className="flex mt-4 gap-2">
            <button
              onClick={handleViewBag}
              className="flex-1 border border-gray-800 text-gray-800 text-sm py-2 rounded hover:bg-gray-100 transition"
            >
              View Bag
            </button>
            <button className="flex-1 bg-green-600 text-white text-sm py-2 rounded hover:bg-green-700 transition">
              Check Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
