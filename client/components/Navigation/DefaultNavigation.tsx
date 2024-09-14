import { memo, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import WebRouter from "../../classes/WebRouter";
import { icon } from "../../router";
import { useScroll } from "../../context";

const DefaultNavigation = () => {
  const [value, setValue] = useState("recents");
  const { isScrolled } = useScroll();
  const location = useLocation();

  useEffect(() => {
    const currentRoute = WebRouter.getRouters().find(
      (route) => route?.path === location.pathname,
    );
    if (currentRoute) {
      setValue(currentRoute.name);
    }
  }, [location]);

  const getLinkClass = (buttonValue: string) =>
    value === buttonValue
      ? "text-blue-500"
      : "text-gray-500 hover:text-blue-500";

  const uniqueRoutes = useMemo(
    () =>
      Array.from(
        new Set(WebRouter.getRouters().map((route) => route?.name)),
      ).map((name) =>
        WebRouter.getRouters().find((route) => route?.name === name),
      ),
    [],
  );

  return (
    <motion.nav
      className={`${isScrolled ? "fixed" : "fixed"} left-1/2 top-4 z-10 w-1/3 -translate-x-1/2 transform rounded-lg bg-black font-bold shadow-md`}
      initial={{ opacity: 1, y: 0 }}
      animate={isScrolled ? { opacity: 0.75, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex justify-around py-3">
        {uniqueRoutes.map(
          (item) =>
            item &&
            !item?.path.endsWith("/") && (
              <Link
                key={item.name}
                className={`flex flex-col items-center ${getLinkClass(item.name)}`}
                to={item.path}
              >
                <FontAwesomeIcon
                  icon={icon[item.name as keyof object]}
                  size="lg"
                />
                <motion.span
                  className="text-xs"
                  initial={false}
                  animate={{
                    opacity: value === item.name ? 1 : 0,
                    y: value === item.name ? 0 : -5,
                    visibility: value === item.name ? "visible" : "hidden",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </motion.span>
              </Link>
            ),
        )}
      </div>
    </motion.nav>
  );
};

export default memo(DefaultNavigation);
