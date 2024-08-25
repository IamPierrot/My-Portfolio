import { Footer } from "../../components";
import { Layout } from "../../types/Layout";

const Mainlayout: Layout = ({ children }) => {
  return (
    <>
      <div className="h-full w-full">{children}</div>
      <Footer></Footer>
    </>
  );
};

export default Mainlayout;
