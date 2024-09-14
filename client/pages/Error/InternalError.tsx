const InternalError = () => {
  return (
    <main className="mx-24 mt-24 grid min-h-full place-items-center rounded-lg bg-white px-6 py-24 shadow-lg shadow-slate-700 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-4xl font-semibold text-red-600">500</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Internal Server Error
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, something went wrong on our end. We're working to fix it.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-y-4">
          <p className="text-sm text-gray-600">
            Note: If this error persists, please try refreshing the page or
            clearing your browser cache.
          </p>
        </div>
      </div>
    </main>
  );
};

export default InternalError;
