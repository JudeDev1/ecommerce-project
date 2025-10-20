import { useProduct } from "../context/ProductContext";
import woman1 from "../assets/ars1.png";
import woman2 from "../assets/ars2.png";
import woman3 from "../assets/ars3.png";
import woman4 from "../assets/ars4.png";
import woman5 from "../assets/ars5.png";
import woman6 from "../assets/ars6.png";

import man1 from "../assets/mrn1.jpg";
import man2 from "../assets/mrn2.jpg";
import man3 from "../assets/mrn3.jpg";
import man4 from "../assets/mrn4.jpg";
import man5 from "../assets/mrn5.jpg";
import man6 from "../assets/mrn6.jpg";

import kid1 from "../assets/kid1.jpg";
import kid2 from "../assets/kids2.jpg";
import kid3 from "../assets/kids3.jpg";
import kid4 from "../assets/kids4.jpg";
import kid5 from "../assets/kids5.jpg";
import kid6 from "../assets/kids6.jpg";

export const products = {
  WOMEN: [
    { id: 1, name: "Apollo Running Short", price: 50.0, image: woman1 },
    { id: 2, name: "Apollo Running Short", price: 50.0, image: woman2 },
    { id: 3, name: "Apollo Running Short", price: 50.0, image: woman3 },
    { id: 4, name: "Apollo Running Short", price: 50.0, image: woman4 },
    { id: 5, name: "Apollo Running Short", price: 50.0, image: woman5 },
    { id: 6, name: "Apollo Running Short", price: 50.0, image: woman6 },
  ],
  MEN: [
    { id: 1, name: "Atlas Training Tee", price: 60.0, image: man1 },
    { id: 2, name: "Atlas Training Tee", price: 60.0, image: man2 },
    { id: 3, name: "Atlas Training Tee", price: 60.0, image: man3 },
    { id: 4, name: "Atlas Training Tee", price: 60.0, image: man4 },
    { id: 5, name: "Atlas Training Tee", price: 60.0, image: man5 },
    { id: 6, name: "Atlas Training Tee", price: 60.0, image: man6 },
  ],
  KIDS: [
    { id: 1, name: "Zephyr Kiddies Wear", price: 45.0, image: kid1 },
    { id: 2, name: "Zephyr Kiddies Wear", price: 45.0, image: kid2 },
    { id: 3, name: "Zephyr Kiddies Wear", price: 45.0, image: kid3 },
    { id: 4, name: "Zephyr Kiddies Wear", price: 45.0, image: kid4 },
    { id: 5, name: "Zephyr Kiddies Wear", price: 45.0, image: kid5 },
    { id: 6, name: "Zephyr Kiddies Wear", price: 45.0, image: kid6 },
  ],
};

export default function ProductList() {
  const { activeCategory, setSelectedProduct } = useProduct();
  const items = products[activeCategory] || [];

  return (
    <section className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.length > 0 ? (
        items.map((product) => (
          <div
            key={product.id}
            className="rounded-lg shadow hover:shadow-lg transition p-4 bg-white cursor-pointer"
            onClick={() => setSelectedProduct(product)}
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
    </section>
  );
}
