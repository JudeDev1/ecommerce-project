// src/components/ProductDetail.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";
import products from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { selectedProduct, clearSelectedProduct } = useProduct();

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Green");
  const [mainImage, setMainImage] = useState<string>("");

  const product =
    selectedProduct ||
    Object.values(products)
      .flat()
      .find((p) => p.id === Number(id));

  useEffect(() => {
    if (!product) navigate("/");
    else setMainImage(product.image || "");
  }, [product, navigate]);

  const sizes = ["XS", "S", "M", "L"];
  const colors = [
    { name: "Green", code: "#4CAF50" },
    { name: "Black", code: "#000000" },
    { name: "Grey", code: "#808080" },
  ];

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, quantity: 1 });
    navigate("/cart");
  };

  const handleGoBack = () => {
    clearSelectedProduct();
    navigate("/"); // Always go back to product list
  };

  if (!product) return null;

  // Generate fallback thumbnails if product.images doesn't exist
  const thumbnails = product.images?.length
    ? product.images
    : [product.image, product.image, product.image];

  return (
    <section className="p-8 flex flex-col md:flex-row items-start gap-12 relative">
      {/* Back button */}
      <button
        onClick={handleGoBack}
        className="mb-4 text-green-600 hover:underline absolute top-6 left-6"
      >
        ← Back
      </button>

      {/* Product Images Section */}
      <div className="flex w-full md:w-1/2 gap-6">
        {/* Thumbnails - vertical */}
        <div className="hidden md:flex flex-col gap-4">
          {thumbnails.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} ${index}`}
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 object-cover rounded-md cursor-pointer border transition-all ${
                mainImage === img
                  ? "border-green-600 scale-105"
                  : "border-gray-300 hover:scale-105"
              }`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full max-w-md rounded-lg object-cover shadow-sm"
          />
        </div>
      </div>

      {/* Product Info Section */}
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl leading-tight font-bold">{product.name}</h1>

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
                    : "border-black hover:bg-black hover:text-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

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
                  borderRadius: "0.25rem",
                }}
              ></div>
            ))}
          </div>
        </div>

        <h3 className="font-semibold uppercase mb-2">Price:</h3>
        <p className="text-lg font-medium mb-6">${product.price.toFixed(2)}</p>

        <button
          onClick={handleAddToCart}
          className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition"
        >
          ADD TO CART
        </button>

        <p className="mt-8 text-gray-700 leading-relaxed">
          Find stunning women’s cocktail dresses and party dresses. Stand out in lace
          and metallic cocktail dresses and party dresses from all your favourite brands.
        </p>
      </div>
    </section>
  );
}
