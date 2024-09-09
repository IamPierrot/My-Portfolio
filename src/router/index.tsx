import { BrowserRouter } from "react-router-dom";
import { RouterWithAnimation } from "./router";
import WebRouter from "../classes/WebRouter";
import { CinematicLayout, MainLayout } from "../layouts";
import { faHome, faInfo } from "@fortawesome/free-solid-svg-icons";

import { lazy, Suspense } from "react";
import { Loading } from "../components";

const routes = [
  {
    path: ["/home", "/"],
    component: lazy(() => import("../pages/Home/Home")),
    layout: MainLayout,
  },
  {
    path: "/about",
    component: lazy(() => import("../pages/About/About")),
    layout: CinematicLayout,
  },
  {
    path: "*",
    component: lazy(() => import("../pages/Error/NotFound")),
    layout: MainLayout,
  },
];

routes.forEach(({ path, component, layout }) => {
  if (Array.isArray(path)) {
    path.forEach((p) => WebRouter.createWebRouter(p, component, layout));
  } else {
    WebRouter.createWebRouter(path, component, layout);
  }
});

export const icon = {
  home: faHome,
  about: faInfo,
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
