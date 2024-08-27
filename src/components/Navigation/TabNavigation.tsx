import { memo, useState, useEffect, useRef } from "react";
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
    offset: 0,
  });

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (tabRefs.current[activeTabIndex]) {
      const { offsetWidth, offsetLeft } = tabRefs.current[activeTabIndex]!;
      setUnderlineProps({ width: offsetWidth, offset: offsetLeft });
    }
  }, [activeTabIndex, tabs]);

  return (
    <>
      <nav className="relative flex flex-wrap justify-center border-b border-gray-300 md:justify-start">
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            className={`relative z-10 px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none ${
              index === activeTabIndex
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTabIndex(index)}
          >
            {tab.label}
          </button>
        ))}
        <motion.div
          className="absolute bottom-0 h-0.5 bg-blue-600"
          initial={false}
          animate={{ width: underlineProps.width, x: underlineProps.offset }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </nav>
      <div className="mt-4 rounded-lg bg-gray-100 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabIndex}
            initial={{
              opacity: 0,
              x: activeTabIndex > initialTabIndex ? 100 : -100,
            }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: activeTabIndex > initialTabIndex ? -100 : 100,
            }}
            transition={{ duration: 0.4 }}
          >
            {tabs[activeTabIndex]?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default memo(Tabs);
