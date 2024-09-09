import languagesData from "../../../configs/ProgramLanguages.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../../../components/Other/ToolTip";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Language = () => {
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
      <h2 className="relative mb-6 w-1/4 border-b-2 border-black pb-2 text-center text-4xl font-bold tracking-tight text-black">
        <span className="text-black">Languages</span>
      </h2>
      <motion.ul
        ref={ref}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        {languagesData.map((value) => (
          <motion.li
            key={value.name}
            variants={itemVariants}
            className="group relative flex cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="relative z-10 flex-grow p-6">
              <span
                className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold"
                style={{
                  backgroundColor: value.badgeColor,
                  color:
                    value.badgeColor === "#E8E8E8" ||
                    value.badgeColor === "#FFD43B"
                      ? "#000000"
                      : "#FFFFFF",
                }}
              >
                {value.name}
              </span>
              <div className="flex items-center space-x-4">
                <span
                  className="grid h-16 w-16 place-items-center rounded-full bg-contain bg-center"
                  style={{ backgroundImage: `url('${value.icon}')` }}
                ></span>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: value.mainColor }}
                >
                  {value.name}
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            </div>
            <div className="relative z-10 mt-auto flex items-center justify-between p-4">
              <a
                href={value.linkToLearn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-semibold transition-colors duration-300 hover:text-opacity-80"
                style={{ color: value.mainColor }}
              >
                Learn More &rarr;
              </a>
              {value.main && (
                <Tooltip title="Main" placement="left">
                  <div className="rotate-12 transform transition-transform">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-400"
                    />
                  </div>
                </Tooltip>
              )}
            </div>
            <span
              className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30"
              style={{ backgroundColor: value.mainColor }}
            ></span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};
