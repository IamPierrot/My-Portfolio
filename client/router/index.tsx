import { BrowserRouter } from "react-router-dom";
import { RouterWithAnimation } from "./router";
import WebRouter from "../classes/WebRouter";
import { CinematicLayout, MainLayout } from "../layouts";
import { faFile, faHome, faInfo } from "@fortawesome/free-solid-svg-icons";

import { lazy, Suspense } from "react";
import { Loading } from "../components";

const routes = [
  {
    path: ["/home", "/"],
    component: lazy(() => import("../pages/Home")),
    layout: MainLayout,
  },
  {
    path: "/about",
    component: lazy(() => import("../pages/About")),
    layout: CinematicLayout,
  },
  {
    path: "*",
    component: lazy(() => import("../pages/Error/NotFound")),
    layout: MainLayout,
    notShowInSideBar: true,
  },
  {
    path: "/error",
    component: lazy(() => import("../pages/Error/InternalError")),
    layout: MainLayout,
    notShowInSideBar: true,
  },
  {
    path: "/resume",
    component: lazy(() => import("../pages/Resume")),
    layout: CinematicLayout,
  },
];

routes.forEach(({ path, component, layout, notShowInSideBar }) => {
  if (Array.isArray(path)) {
    path.forEach((p) => WebRouter.createWebRouter(p, component, layout, notShowInSideBar));
  } else {
    WebRouter.createWebRouter(path, component, layout, notShowInSideBar);
  }
});

export const icon = {
  home: faHome,
  about: faInfo,
  resume: faFile,
};

export default function MainWebsite() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <RouterWithAnimation />
      </Suspense>
    </BrowserRouter>
  );
}
