import { DefaultNavigation, Footer } from "../../components";
import { ScrollProvider } from "../../context";
import { Layout } from "../../types/Layout";

const Mainlayout: Layout = ({ children }) => {
  return (
    <section className="flex flex-col">
      <div>
        <ScrollProvider>
          <DefaultNavigation></DefaultNavigation>
        </ScrollProvider>
      </div>
      <div className="mt-16 flex min-h-screen flex-col">
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </section>
  );
};

export default Mainlayout;
