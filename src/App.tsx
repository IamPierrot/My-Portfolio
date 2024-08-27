import { lazy, Suspense } from "react";
import { Loading } from "./components";

const MainWebsite = lazy(() => import("./router"));

function App() {
  return (
    <div className="font-mono">
      <Suspense fallback={<Loading />}>
        <MainWebsite></MainWebsite>
      </Suspense>
    </div>
  );
}

export default App;
