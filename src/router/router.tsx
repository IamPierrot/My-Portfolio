import { AnimatePresence } from "framer-motion";
import { Routes, useLocation } from "react-router-dom";
import WebRouter from "../classes/WebRouter";

const AnimatedRoutes: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence initial={false}>
      <Routes location={location} key={location.key}>
        {children}
      </Routes>
    </AnimatePresence>
  );
};

export const RouterWithAnimation = () => {
  return <AnimatedRoutes>{WebRouter.renderAllWebRouters()}</AnimatedRoutes>;
};

