import { Language } from "./Language";
import { Tool } from "./Tool";

export const Skill = () => {
  return (
    <section className="relative p-8">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 pb-3 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
          Tools And Languages
        </h2>
        <p className="text-muted-foreground max-w-[85%] leading-normal sm:text-lg sm:leading-7">
          This product is personalized by Pierrot via individual preference and
          tailoring recommendations or content based on personal experience.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        <Language />
        <Tool />
      </div>
    </section>
  );
};
