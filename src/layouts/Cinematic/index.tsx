import { Footer, SideBarNavigation } from "../../components";
import { Layout } from "../../types/Layout";

const CinematicLayout: Layout = ({ children }) => {
  return (
    <section className="flex flex-col">
      <SideBarNavigation />
      <div className="ml-10 mt-16 flex min-h-screen flex-col">
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </section>
  );
};

export default CinematicLayout;
