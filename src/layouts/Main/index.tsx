import { Navigation, Footer } from "../../components";
import { ScrollProvider } from "../../context";
import { Layout } from "../../types/Layout";

const Mainlayout: Layout = ({ children }) => {
  return (
    <>
      <ScrollProvider>
        <Navigation></Navigation>
      </ScrollProvider>
      <div className="h-full w-full">{children}</div>
      <Footer></Footer>
    </>
  );
};

export default Mainlayout;
