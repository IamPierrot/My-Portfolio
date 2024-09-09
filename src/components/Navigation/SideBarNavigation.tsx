import { memo, useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import WebRouter from "../../classes/WebRouter";
import { icon } from "../../router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Tooltip from "../Other/ToolTip";

const SideBarNavigation = () => {
  const [selectedRoute, setSelectedRoute] = useState("");
  const location = useLocation();

  useEffect(() => {
    const currentRoute = WebRouter.getRouters().find(
      (route) => route?.path === location.pathname,
    );
    if (currentRoute) {
      setSelectedRoute(currentRoute.name);
    }
  }, [location]);

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
    <>
      <motion.aside
        initial={{ opacity: 0, x: -250 }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{ type: "tween" }}
        className="fixed z-10 flex h-full w-16 flex-col items-center rounded bg-gray-900 text-gray-400 md:w-16 md:translate-x-0 md:opacity-100"
      >
        <a className="mt-3 flex items-center justify-center" href="/">
          <svg
            className="h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
        </a>
        <div className="relative mt-3 flex flex-col items-center border-t border-gray-700">
          {uniqueRoutes.map(
            (item) =>
              item &&
              !item?.path.endsWith("/") && (
                <Tooltip
                  title={item.name.toLocaleUpperCase("en-es")}
                  placement="right"
                >
                  <Link
                    key={item.name}
                    className={`mt-2 flex h-12 w-12 items-center justify-center rounded ${
                      selectedRoute === item.name
                        ? "bg-gray-700 text-gray-200"
                        : "hover:bg-gray-700 hover:text-gray-300"
                    }`}
                    to={item.path}
                  >
                    <svg className="h-6 w-6 stroke-current">
                      <FontAwesomeIcon
                        icon={icon[item.name as keyof object]}
                        size="lg"
                      />
                    </svg>
                  </Link>
                </Tooltip>
              ),
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default memo(SideBarNavigation);
