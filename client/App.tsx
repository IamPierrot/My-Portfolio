import { lazy, Suspense, useEffect, useState } from "react";
import { Loading } from "./components";
import { useNotification } from "./hooks";

const MainWebsite = lazy(() => import("./router"));

function App() {
  const { showNotification } = useNotification();
  const [firstVisited, setFirstVisited] = useState(sessionStorage.getItem("firstVisited") === "ok");

  useEffect(() => {
    if (firstVisited) return;
    showNotification("Welcome", "Thank you for visiting our website!");
    setFirstVisited(true);
    sessionStorage.setItem("firstVisited", "ok");
  }, [firstVisited]);

  return (
    <main className="font-mono">
      <Suspense fallback={<Loading />}>
        <MainWebsite></MainWebsite>
      </Suspense>
    </main>
  );
}

export default App;
