import { lazy, Suspense } from "react";
import { Loading } from "./components";

const MainWebsite = lazy(() => import("./router"));

function App() {
  return (
    <body className="font-mono">
      <Suspense fallback={<Loading />}>
        <MainWebsite></MainWebsite>
      </Suspense>
    </body>
  );
}

export default App;
