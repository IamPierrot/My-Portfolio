import { TabNavigation } from "../../components";
import { Feature } from "./Features";
import { ToolAndLanguage } from "./Tool";

export const About = () => {
  const tabs = [
    {
      label: "Features",
      content: <Feature />,
    },
    {
      label: "Tools & Languages",
      content: <ToolAndLanguage />,
    },
  ];

  return (
    <section className="container mx-auto flex flex-col space-y-6 rounded-lg bg-slate-50 px-4 py-8 md:py-12 lg:py-20">
      <TabNavigation tabs={tabs} />
    </section>
  );
};
