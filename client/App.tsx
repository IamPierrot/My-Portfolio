import { lazy, Suspense, useEffect } from "react";
import { Loading } from "./components";
import { useNotification } from "./hooks";

const MainWebsite = lazy(() => import("./router"));

function App() {
  const { showNotification } = useNotification();

  useEffect(() => {
    if (sessionStorage.getItem("firstVisited")) return;
    showNotification("Welcome", "Thank you for visiting our website!");
    sessionStorage.setItem("firstVisited", "ok");
  }, []);

  return (
    <main className="font-mono">
      <Suspense fallback={<Loading />}>
        <MainWebsite></MainWebsite>
      </Suspense>
    </main>
  );
}

export default App;
