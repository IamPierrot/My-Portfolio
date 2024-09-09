import { memo, useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  initialTabIndex?: number;
};

const Tabs = ({ tabs, initialTabIndex = 0 }: TabsProps) => {
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

  return (
    <>
      <nav ref={tabsContainerRef} className="relative flex flex-wrap justify-center border-b border-gray-300 md:justify-start">
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            className={`relative z-10 px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none ${
              index === activeTabIndex
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
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
          className="absolute bottom-0 h-0.5 bg-blue-600"
          initial={false}
          animate={{ width: underlineProps.width, left: underlineProps.left }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </nav>
      <div className="mt-4 rounded-lg bg-gray-100 p-4 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabIndex}
            initial={{ opacity: 0, x: 20 * getAnimationDirection(activeTabIndex), height: 'auto' }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, x: -20 * getAnimationDirection(activeTabIndex), height: 'auto' }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5
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
