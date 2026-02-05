// src/context/ProductContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[]; // optional array for multiple images
}

interface ProductContextType {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  clearSelectedProduct: () => void; // ✅ added this
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [activeCategory, setActiveCategory] = useState<string>("WOMEN");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const clearSelectedProduct = () => setSelectedProduct(null);

  return (
    <ProductContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        selectedProduct,
        setSelectedProduct,
        clearSelectedProduct, // 
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
