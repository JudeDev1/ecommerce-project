import { useState, useRef, useEffect } from "react";
import logo from "../assets/a-logo.png";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("WOMEN");
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [currency, setCurrency] = useState({ code: "USD", symbol: "$" });
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const navRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navItems = ["WOMEN", "MEN", "KIDS"];

  // Adjust underline position when the active nav item changes (desktop only)
  useEffect(() => {
    if (window.innerWidth < 768) return; // skip underline on mobile
    const activeIndex = navItems.indexOf(active);
    const activeEl = navRefs.current[activeIndex];
    if (activeEl) {
      setUnderlineStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [active]);

  return (
    <nav className="w-full bg-white shadow-md p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Navigation Items */}
        <div className="hidden md:flex flex-col relative">
          <div className="flex space-x-8 text-sm font-semibold tracking-wide uppercase relative">
            {navItems.map((item, index) => (
              <div
                key={item}
                ref={(el) => (navRefs.current[index] = el)}
                onClick={() => setActive(item)}
                className={`cursor-pointer pb-1 ${
                  active === item
                    ? "text-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Animated underline for active nav item */}
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

        {/* Currency Dropdown + Cart */}
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
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg w-28 text-sm z-20">
                {[
                  { code: "USD", symbol: "$" },
                  { code: "EUR", symbol: "€" },
                  { code: "GBP", symbol: "£" },
                ].map((cur) => (
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
                ))}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <div className="relative cursor-pointer">
            <ShoppingCart size={26} className="text-gray-800" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center space-y-3">
          {navItems.map((item) => (
            <div
              key={item}
              onClick={() => {
                setActive(item);
                setIsOpen(false);
              }}
              className={`uppercase font-semibold cursor-pointer transition-colors ${
                active === item
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
