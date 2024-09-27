import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Loading } from "./components";
import { NotificationProvider } from "./context";

const App = lazy(() => import("./App"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </Suspense>
  </StrictMode>,
);
