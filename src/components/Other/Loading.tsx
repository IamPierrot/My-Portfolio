export const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50">
      <div className="border-t-solid h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-gray-300 border-t-white"></div>
      <div className="mt-4 text-lg font-bold text-white">Wait a minute...</div>
    </div>
  );
};
