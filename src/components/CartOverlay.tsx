//src//components/CartOverlay
import { useState } from "react";
import woman1 from "../assets/grey.png";
import wayfarer from "../assets/wayfarer.png";

interface CartOverlayProps {
  onViewBag: () => void;
  onClose: () => void;
}

export default function CartOverlay({ onViewBag, onClose }: CartOverlayProps) {
    const [cartItems, setCartItems] = useState([
        {
        id: 1,
        name: "Apollo Running Short",
        price: 50,
        size: "M",
        colors: ["Gray", "Black", "Green"],
        image: woman1,
        quantity: 2,
        },
        {
        id: 2,
        name: "Jupiter Wayfarer",
        price: 75,
        size: "S",
        colors: ["Black", "Light Blue", "Orange"],
        image: wayfarer,
        quantity: 1,
        },
    ]);

    const increaseQty = (id: number) =>
        setCartItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );

    const decreaseQty = (id: number) =>
        setCartItems((prev) =>
        prev.map((i) =>
            i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
        )
    );

    const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
    <div
    className="absolute right-0 mt-3 w-96 bg-white shadow-2xl rounded-lg p-5 z-50 border border-gray-200"
    onClick={(e) => e.stopPropagation()}
    >
        <h2 className="font-bold text-lg mb-4">
            My Bag, <span className="font-normal">{cartItems.length} items</span>
        </h2>

        <div className="space-y-6 max-h-96 overflow-y-auto">
            {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-start">
                {/* Left Side */}
                <div className="flex-1">
                    <p className="font-semibold text-sm leading-tight">
                    {item.name.split(" ")[0]}
                    </p>
                    <p className="text-gray-700 text-sm mb-1">
                        {item.name.split(" ").slice(1).join(" ")}
                    </p>
                    <p className="text-sm font-medium mb-2">
                        ${item.price.toFixed(2)}
                    </p>

                    {/* Sizes */}
                    <div className="mb-2">
                        <h3 className="font-semibold text-xs uppercase mb-1">Size:</h3>
                        <div className="flex space-x-1">
                            {["S", "M"].map((size) => (
                                <button
                                    key={size}
                                    className={`px-2 py-1 text-xs border ${
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
                    <div>
                        <h3 className="font-semibold text-xs uppercase mb-1">Color:</h3>
                        <div className="flex space-x-1">
                            {item.colors.map((color) => (
                                <div
                                    key={color}
                                    className="w-5 h-5 border-2 border-gray-300 rounded-sm"
                                    style={{
                                    backgroundColor:
                                    color === "Black"
                                        ? "#000"
                                        : color === "Gray"
                                        ? "#808080"
                                        : color === "Green"
                                        ? "#228B22"
                                        : color === "Light Blue"
                                        ? "#87CEFA"
                                        : color === "Orange"
                                        ? "#FFA500"
                                        : "#ccc",
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                        <button
                            onClick={() => increaseQty(item.id)}
                            className="border px-2 text-sm font-semibold"
                        >
                            +
                        </button>
                        <span className="my-1 text-sm font-medium">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => decreaseQty(item.id)}
                            className="border px-2 text-sm font-semibold"
                        >
                            −
                        </button>
                    </div>
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                    />
                </div>
            </div>
            ))}
        </div>

        {/* Total */}
        <div className="flex justify-between mt-6 font-semibold text-sm">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-5 text-sm">
            <button
                onClick={() => {
                onViewBag(); // back to CartPage
                onClose();   // closes overlay
            }}
                className="border border-gray-800 text-gray-800 px-3 py-2 rounded hover:bg-gray-800 hover:text-white transition"
            >
                VIEW BAG
            </button>
            <button className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition">
                CHECK OUT
            </button>
        </div>
    </div>
  );
}
