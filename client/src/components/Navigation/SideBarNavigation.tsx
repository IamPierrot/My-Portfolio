import { memo, useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import WebRouter from "../../classes/WebRouter";
import { icon } from "../../router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../Other/ToolTip";
import myAvatar from "../../assets/myAvatar.jpg";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const SideBarNavigation = () => {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [toggleBar, setToggleBar] = useState(false);
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
      <aside
        className={`fixed z-10 flex h-full w-16 transform flex-col items-center rounded bg-gray-900 text-gray-400 opacity-80 transition-transform duration-300 ease-in-out md:w-16 md:opacity-100 ${toggleBar ? "translate-x-0" : "-translate-x-[90%]"}`}
      >
        <a className="mt-3 flex items-center justify-center" href="/">
          <img
            className="h-8 w-8 rounded-full"
            src={myAvatar}
            alt="My Avatar"
          />
        </a>
        <button
          onClick={() => {
            setToggleBar(!toggleBar);
          }}
          className={`absolute -right-5 top-1/2 h-11 w-11 ${
            toggleBar ? "translate-x-0" : "translate-x-3"
          } -translate-y-[55%] transform rounded-full bg-slate-600 transition-transform duration-300`}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`${
              toggleBar ? "rotate-180" : "rotate-0"
            } items-center text-center text-xl font-bold text-slate-50 transition-all duration-300 ease-linear`}
          ></FontAwesomeIcon>
        </button>
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
      </aside>
    </>
  );
};

export default memo(SideBarNavigation);
