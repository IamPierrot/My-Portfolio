import { BrowserRouter } from "react-router-dom";
import { RouterWithAnimation } from "./router";
import WebRouter from "../classes/WebRouter";
import Home from "../pages/Home/Home";
import { CinematicLayout, MainLayout } from "../layouts";
import { faHome, faInfo } from "@fortawesome/free-solid-svg-icons";
import { About } from "../pages/About/About";
import NoPage from "../pages/Error/NotFound";

WebRouter.createWebRouter("/home", Home, MainLayout);
WebRouter.createWebRouter("/", Home, MainLayout);
WebRouter.createWebRouter("/about", About, CinematicLayout);
WebRouter.createWebRouter("*", NoPage, MainLayout);

export const icon = {
  home: faHome,
  about: faInfo,
};

export default function MainWebsite() {
  return (
    <BrowserRouter>
      <RouterWithAnimation />
    </BrowserRouter>
  );
}
