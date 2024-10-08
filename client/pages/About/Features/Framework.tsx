import frameworksData from "../../../configs/Frameworks.json";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export const FrameWork = () => {
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
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.5,
      },
    },
  };
  const displayLearnedDaysAndNewBadge = useMemo(
    () =>
      (framework: {
        name: string;
        image: string;
        description: string;
        learnTime: number;
      }) => {
        const startDate = new Date("2023-08-01");
        const currentDate = new Date();
        const daysDifference = Math.floor(
          (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        );
        const learnedDays = daysDifference * framework.learnTime;
        const isNew = learnedDays <= 90; // 3 months = 90 days

        return (
          <>
            {isNew && (
              <div className="absolute right-0 top-0 m-2 rounded-md bg-indigo-500 px-2 py-1 font-bold text-white">
                New
              </div>
            )}
            <div className="absolute bottom-0 right-0 m-2 rounded-md bg-gray-700 px-2 py-1 text-xs text-white">
              {`${Math.round(learnedDays)} days learned`}
            </div>
          </>
        );
      },
    [],
  );

  return (
    <div className="container mx-auto">
      <hr className="relative mt-10 w-full border-gray-700 opacity-65" />
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="grid grid-cols-1 gap-4 p-10 sm:grid-cols-2 md:px-20 lg:grid-cols-3"
      >
        {frameworksData.map((framework) => (
          <motion.div
            key={framework.name}
            variants={itemVariants}
            className="overflow-hidden rounded-xl bg-slate-800 shadow-md"
            whileHover="hover"
          >
            <div className="relative">
              <img
                className="h-48 w-full bg-slate-100 object-cover object-center"
                src={framework.image}
                alt={framework.name}
              />
              {displayLearnedDaysAndNewBadge(framework)}
            </div>
            <div className="p-4">
              <div className="mb-2 text-lg font-medium text-white">
                {framework.name}
              </div>
              <p className="text-sm text-gray-400">{framework.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
