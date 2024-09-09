import { TabNavigation } from "../../components";
import { Feature } from "./Features/Features";
import { Skill } from "./ToolAndLanguage/Skill";
import Projects from "./Projects/Project";

const About = () => {
  const tabs = [
    {
      label: "Features",
      content: <Feature />,
    },
    {
      label: "Skill",
      content: <Skill />,
    },
    {
      label: "Projects",
      content: <Projects />,
    },
  ];

  return (
    <section className="container mx-auto flex flex-col space-y-6 rounded-lg bg-slate-50 px-4 py-8 md:py-12 lg:py-20">
      <TabNavigation tabs={tabs} />
    </section>
  );
};

export default About;