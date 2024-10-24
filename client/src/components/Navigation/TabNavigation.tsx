import { memo, useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  initialTabIndex?: number;
  theme?: "dark" | "light";
};

const Tabs = ({ tabs, initialTabIndex = 0, theme = "light" }: TabsProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(initialTabIndex);
  const [underlineProps, setUnderlineProps] = useState({
    width: 0,
    left: 0,
  });

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const updateUnderlineProps = useCallback(() => {
    if (tabRefs.current[activeTabIndex] && tabsContainerRef.current) {
      const activeTab = tabRefs.current[activeTabIndex];
      const containerRect = tabsContainerRef.current.getBoundingClientRect();
      const activeTabRect = activeTab.getBoundingClientRect();

      setUnderlineProps({
        width: activeTabRect.width,
        left: activeTabRect.left - containerRect.left,
      });
    }
  }, [activeTabIndex]);

  useEffect(() => {
    updateUnderlineProps();
    const handleResize = () => {
      requestAnimationFrame(updateUnderlineProps);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateUnderlineProps]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateUnderlineProps);
    });
    if (tabsContainerRef.current) {
      resizeObserver.observe(tabsContainerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [updateUnderlineProps]);

  const getAnimationDirection = useCallback((index: number) => {
    const containerWidth = tabsContainerRef.current?.offsetWidth || 0;
    const tabPosition = tabRefs.current[index]?.offsetLeft || 0;
    const isLeftHalf = tabPosition < containerWidth / 2;
    return isLeftHalf ? 1 : -1;
  }, []);

  const themeClasses = {
    dark: {
      nav: "border-gray-700",
      activeTab: "text-blue-400",
      inactiveTab: "text-gray-400 hover:text-blue-400",
      underline: "bg-blue-400",
      content: "bg-gray-700 text-white",
    },
    light: {
      nav: "border-gray-300",
      activeTab: "text-blue-600",
      inactiveTab: "text-gray-600 hover:text-blue-600",
      underline: "bg-blue-600",
      content: "bg-gray-100 text-black",
    },
  };

  const currentTheme = themeClasses[theme];

  return (
    <>
      <nav
        ref={tabsContainerRef}
        className={`relative flex flex-wrap justify-center border-b ${currentTheme.nav} md:justify-start`}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            className={`relative z-10 px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none ${
              index === activeTabIndex
                ? currentTheme.activeTab
                : currentTheme.inactiveTab
            }`}
            onClick={() => {
              setActiveTabIndex(index);
              requestAnimationFrame(updateUnderlineProps);
            }}
          >
            {tab.label}
          </button>
        ))}
        <motion.div
          className={`absolute bottom-0 h-0.5 ${currentTheme.underline}`}
          initial={false}
          animate={{ width: underlineProps.width, left: underlineProps.left }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </nav>
      <div
        className={`mt-4 rounded-lg ${currentTheme.content} overflow-hidden p-4`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabIndex}
            initial={{
              opacity: 0,
              x: 20 * getAnimationDirection(activeTabIndex),
              height: "auto",
            }}
            animate={{ opacity: 1, x: 0, height: "auto" }}
            exit={{
              opacity: 0,
              x: -20 * getAnimationDirection(activeTabIndex),
              height: "auto",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5,
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {tabs[activeTabIndex]?.content}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default memo(Tabs);
