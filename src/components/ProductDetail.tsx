import { useProduct } from "../context/ProductContext";

export default function ProductDetail() {
  const { selectedProduct, setSelectedProduct } = useProduct();

  if (!selectedProduct) return null;

  return (
    <section className="p-8 max-w-3xl mx-auto">
      <button
        className="mb-4 text-green-600 hover:underline"
        onClick={() => setSelectedProduct(null)}
      >
        ← Back to products
      </button>

      <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row gap-8">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="w-full md:w-1/2 object-cover rounded"
        />
        <div>
          <h2 className="text-2xl font-semibold">{selectedProduct.name}</h2>
          <p className="mt-3 text-xl font-medium">
            ${selectedProduct.price.toFixed(2)}
          </p>
          <button className="mt-6 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
