import { useState, useEffect, useContext, createContext } from "react";

interface ScrollContextType {
  isScrolled: boolean;
}

const ScrollContext = createContext<ScrollContextType>({} as ScrollContextType);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    const handleLocationChange = () => {
      setShowNav(true);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("pushState", handleLocationChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("pushState", handleLocationChange);
    };
  }, []);

  useEffect(() => {
    setShowNav(window.scrollY > 10);
  }, []);

  return (
    <ScrollContext.Provider value={{ isScrolled: showNav }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = (): ScrollContextType => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};