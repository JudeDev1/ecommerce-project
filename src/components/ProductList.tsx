import woman1 from "../assets/ars1.png";
import woman2 from "../assets/ars2.png";
import woman3 from "../assets/ars3.png";
import woman4 from "../assets/ars4.png";
import woman5 from "../assets/ars5.png";
import woman6 from "../assets/ars6.png";

export const products = {
  WOMEN: [
    { id: 1, name: "Apollo Running Short", price: 50.0, image: woman1 },
    { id: 2, name: "Apollo Running Short", price: 50.0, image: woman2 },
    { id: 3, name: "Apollo Running Short", price: 50.0, image: woman3 },
    { id: 4, name: "Apollo Running Short", price: 50.0, image: woman4 },
    { id: 5, name: "Apollo Running Short", price: 50.0, image: woman5 },
    { id: 6, name: "Apollo Running Short", price: 50.0, image: woman6 },
  ],
};

export default function ProductList() {
  const category = "WOMEN"; // 
  const items = products[category];

  return (
    <section className="p-15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((product) => (
        <div
          key={product.id}
          className="rounded-lg shadow hover:shadow-lg transition p-4"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-70 object-cover rounded"
          />
          <h3 className="mt-3 text-lg font-light">{product.name}</h3>
          <p className="font-medium mt-1">
            ${product.price.toFixed(2)}
          </p>
        </div>
      ))}
    </section>
  );
}
