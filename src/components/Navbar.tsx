//src/components/Navbar.tsx
import { useState, useRef, useEffect } from "react";
import logo from "../assets/a-logo.png";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useProduct } from "../context/ProductContext";
import CartOverlay from "./CartOverlay";

export default function Navbar() {
  const { activeCategory, setActiveCategory } = useProduct();
  const [isOpen, setIsOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState({ code: "USD", symbol: "$" });
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const navRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cartRef = useRef<HTMLDivElement | null>(null);
  const navItems = ["WOMEN", "MEN", "KIDS"];

  // 
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const activeIndex = navItems.indexOf(activeCategory);
    const activeEl = navRefs.current[activeIndex];
    if (activeEl) {
      setUnderlineStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [activeCategory]);

  // 
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 
  const handleViewBag = () => {
    const event = new CustomEvent("openCartPage");
    window.dispatchEvent(event);
    setIsCartOpen(false);
  };

  return (
    <nav className="w-full bg-white shadow-md p-4 relative z-40">
      <div className="container mx-auto flex justify-between items-center">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-col relative">
          <div className="flex space-x-8 text-sm font-semibold tracking-wide uppercase relative">
            {navItems.map((item, index) => (
              <div
                key={item}
                ref={(el) => (navRefs.current[index] = el)}
                onClick={() => setActiveCategory(item)}
                className={`cursor-pointer pb-1 ${
                  activeCategory === item
                    ? "text-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Animated underline */}
          <div
            className="absolute bottom-0 left-0 h-0.5 bg-green-600 transition-all duration-300 ease-in-out"
            style={{
              width: `${underlineStyle.width}px`,
              transform: `translateX(${underlineStyle.left}px)`,
            }}
          ></div>
        </div>

        {/* Center Logo */}
        <div className="flex-1 flex justify-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Currency & Cart */}
        <div className="flex items-center space-x-4 relative">
          {/* Currency dropdown */}
          <div
            className="relative cursor-pointer"
            onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
          >
            <div className="flex items-center space-x-1 font-bold text-lg">
              <span>{currency.symbol}</span>
              <ChevronDown size={18} />
            </div>

            {isCurrencyOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg w-28 text-sm z-30">
                {[{ code: "USD", symbol: "$" }, { code: "EUR", symbol: "€" }, { code: "GBP", symbol: "£" }].map(
                  (cur) => (
                    <div
                      key={cur.code}
                      onClick={() => {
                        setCurrency(cur);
                        setIsCurrencyOpen(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {cur.code} ({cur.symbol})
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Cart Icon + Overlay */}
          <div className="relative" ref={cartRef}>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative"
            >
              <ShoppingCart size={26} className="text-gray-800" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {isCartOpen && (
              <div className="absolute right-0">
                <CartOverlay
                  onClose={() => setIsCartOpen(false)}
                  onViewBag={handleViewBag}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center space-y-3">
          {navItems.map((item) => (
            <div
              key={item}
              onClick={() => {
                setActiveCategory(item);
                setIsOpen(false);
              }}
              className={`uppercase font-semibold cursor-pointer transition-colors ${
                activeCategory === item
                  ? "text-green-600"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
