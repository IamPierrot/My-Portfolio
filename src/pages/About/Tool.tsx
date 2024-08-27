import toolData from "../../configs/ToolConfigs.json";

export const ToolAndLanguage = () => {
  return (
    <section className="p-8">
      <h1 className="mb-4 w-1/2 border-b-2 border-slate-300 pb-2 pl-2 text-4xl font-bold">
        Tools And Languages
      </h1>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {toolData.map((value) => (
          <li
            key={value.name}
            className="group relative cursor-pointer overflow-hidden bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-lg sm:px-10"
          >
            <span
              className="absolute right-4 top-4 z-20 rounded-full px-3 py-1 text-xs font-extrabold text-black"
              style={{ backgroundColor: value.badgeColor }}
            >
              {value.name}
            </span>
            <span
              className="absolute top-10 z-0 h-20 w-20 rounded-full transition-all duration-300 group-hover:scale-[10]"
              style={{ backgroundColor: value.mainColor }}
            ></span>
            <div className="relative z-10 mx-auto max-w-md">
              <span
                className="grid h-20 w-20 place-items-center rounded-full border-gray-950 bg-contain bg-center transition-all duration-300 group-hover:bg-stone-300"
                style={{ backgroundImage: `url('${value.icon}')` }}
              ></span>
              <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                <p>{value.description}</p>
              </div>
              <div className="pt-5 text-base font-semibold leading-7">
                <a
                  href="#"
                  className="text-sky-500 transition-all duration-300 group-hover:text-white"
                >
                  Learn With Me &rarr;
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
