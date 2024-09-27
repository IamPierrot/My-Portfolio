import { Footer, SideBarNavigation } from "../../components";
import { Layout } from "../../types/Layout";

const CinematicLayout: Layout = ({ children }) => {
  return (
    <section className="flex flex-col bg-gradient-to-r from-cyan-500 to-blue-500">
      <SideBarNavigation />
      <div className="mt-16 flex min-h-screen flex-col">
        <main className="mb-16 flex-grow">{children}</main>
        <Footer />
      </div>
    </section>
  );
};

export default CinematicLayout;
