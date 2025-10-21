import { useState } from "react";
import woman1 from "../assets/ars1.png"; // example image

export default function PDP() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Green");

  const sizes = ["XS", "S", "M", "L"];
  const colors = [
    { name: "Green", code: "#808080" },
    { name: "Black", code: "#000000" },
    { name: "Grey", code: "#4CAF50" },
  ];

  return (
    <section className="p-8 flex flex-col md:flex-row items-start gap-12">
      {/* LEFT SIDE - Product Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={woman1}
          alt="Product"
          className="w-full max-w-md rounded-lg object-cover"
        />
      </div>

      {/* RIGHT SIDE - Product Details */}
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl leading-tight">
          <span className="font-bold">Apollo</span><br />
          <span className="font-light">Running short</span>
        </h1>

        {/* Sizes */}
        <div className="mt-6 mb-6">
          <h3 className="font-semibold uppercase mb-2">Size:</h3>
          <div className="flex space-x-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border text-sm cursor-pointer transition-all ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "border-black hover:bg-black hover:text-white hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-6">
          <h3 className="font-semibold uppercase mb-2">Color:</h3>
          <div className="flex space-x-3">
            {colors.map((color) => (
              <div
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-10 h-10 border-2 cursor-pointer transition-transform ${
                  selectedColor === color.name
                    ? "border-green-600 scale-110"
                    : "border-gray-300 hover:scale-105"
                }`}
                style={{
                  backgroundColor: color.code,
                  borderRadius: "0.25rem", // square corners
                }}
              ></div>
            ))}
          </div>
            {/*
            <p className="text-sm mt-2 text-gray-600">
              Selected: {selectedColor}
            </p>
            */}
        </div>

        <h3 className="font-semibold uppercase mb-2">Price:</h3>
        <p className="text-lg font-medium mb-6">$50.00</p>

        {/* Add to Cart */}
        <button className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition">
          ADD TO CART
        </button>

        {/* Description */}
        <p className="mt-8 text-gray-700 leading-relaxed">
          Find stunning women's cocktail dresses
          and party dresses. Stand out in lace and
          metallic cocktail dresses and party 
          dresses from all your favourite brands. 
        </p>
      </div>
    </section>
  );
}
