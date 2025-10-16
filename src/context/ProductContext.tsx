import { createContext, useContext, useState, ReactNode } from "react";

interface ProductContextType {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [activeCategory, setActiveCategory] = useState("WOMEN");

  return (
    <ProductContext.Provider value={{ activeCategory, setActiveCategory }}>
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
