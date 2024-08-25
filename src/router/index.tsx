import { BrowserRouter } from "react-router-dom";
import { RouterWithAnimation } from "./router";
import WebRouter from "../classes/WebRouter";
import Home from "../pages/Home/Home";
import { MainLayout } from "../layouts";

WebRouter.createWebRouter("/home", Home, MainLayout);

export default function MainWebsite() {
  return (
    <BrowserRouter>
      <RouterWithAnimation />
    </BrowserRouter>
  );
}
