import React from "react";

export const BlockLoading: React.FC = () => {
  return (
    <div className="z-50 flex flex-col items-center justify-center p-4">
      <div className="border-t-solid h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-gray-300 border-t-blue-500"></div>
      <div className="mt-4 text-lg font-semibold text-white">Loading...</div>
    </div>
  );
};
