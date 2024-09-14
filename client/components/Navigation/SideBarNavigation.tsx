import { memo, useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import WebRouter from "../../classes/WebRouter";
import { icon } from "../../router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Tooltip from "../Other/ToolTip";
import myAvatar from "../../assets/myAvatar.jpg";

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
          <img
            className="h-8 w-8 rounded-full"
            src={myAvatar}
            alt="My Avatar"
          />
        </a>
        <div className="relative mt-3 flex flex-col items-center border-t border-gray-700">
          {uniqueRoutes.map(
            (item) =>
              item &&
              !item?.path.endsWith("/") && (
                <Tooltip
                  title={item.name.toLocaleUpperCase("en-es")}
                  key={item.name}
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
