import toolsData from "../../../configs/Tools.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../../../components/Other/ToolTip";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Tool = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="container mx-auto">
      <h2 className="relative w-1/4 border-b-2 border-black pb-2 text-center text-4xl font-bold tracking-tight text-black">
        <span className="text-black">Tools</span>
      </h2>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="grid grid-cols-4 gap-8 p-8 md:p-16"
      >
        {toolsData.map((tool) => (
          <motion.div
            key={tool.name}
            variants={itemVariants}
            className="relative col-span-4 flex flex-col items-center justify-start rounded-xl border-2 border-gray-300 bg-gray-800 px-5 pb-2 pt-10 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-400/50 sm:col-span-2 lg:col-span-1"
          >
            <span className="absolute -top-6 rounded-full border-2 border-gray-300 bg-slate-100 p-3 transition-transform duration-300 group-hover:scale-110">
              <span
                className="grid h-10 w-10 place-items-center rounded-full bg-contain bg-center"
                style={{ backgroundImage: `url('${tool.icon}')` }}
              ></span>
            </span>
            <h2 className="gradient-red my-1 text-base uppercase tracking-wide transition-colors duration-300 group-hover:text-yellow-400">
              {tool.name}
            </h2>
            <p className="py-2 text-center text-sm transition-colors duration-300 group-hover:text-white">
              {tool.description}
            </p>
            <div className="mt-auto flex w-full items-center justify-between">
              <a
                href={tool.linkToLearn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-semibold text-yellow-400 transition-all duration-300 hover:translate-x-1 hover:text-opacity-80"
              >
                Learn More &rarr;
              </a>
              {tool.main && (
                <Tooltip title="Main" placement="left">
                  <div className="rotate-12 transform transition-all duration-300 hover:rotate-45 hover:scale-110">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400"
                    />
                  </div>
                </Tooltip>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
