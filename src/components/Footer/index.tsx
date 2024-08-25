import { memo } from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-slate-600 to-slate-500 py-4 text-center font-light">
      <div className="container mx-auto">
        <p className="text-sm text-white sm:text-base">
          2024 | Copyright ©️ Pierrot
        </p>
        <p className="mt-2 text-xs text-gray-300 sm:text-sm">
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default memo(Footer);
