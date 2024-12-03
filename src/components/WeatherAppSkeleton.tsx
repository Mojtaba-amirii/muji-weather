import { FC } from "react";

const WeatherSkeleton: FC = () => {
  return (
    <main className="container mx-auto my-16 flex flex-col gap-12 animate-pulse">
      {/* today data */}
      <section className="flex flex-col gap-y-6">
        <h2 className="text-xl">
          <div className="bg-gray-300 h-6 w-64 rounded"></div>
        </h2>

        <div className="bg-white shadow rounded-lg gap-10 px-6 items-center p-4">
          <div className="flex flex-col px-4 gap-1 w-1/6">
            <span className="bg-gray-300 h-10 w-24 rounded"></span>
            <p className="bg-gray-300 h-4 w-32 rounded mt-2"></p>
            <p className="bg-gray-300 h-4 w-40 rounded mt-1"></p>
          </div>
          <div className="flex gap-10 sm:gap-16 justify-between w-full overflow-x-auto mt-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <span className="bg-gray-300 h-4 w-16 rounded"></span>
                <div className="bg-gray-300 h-12 w-12 rounded-full mt-2"></div>
                <span className="bg-gray-300 h-4 w-12 rounded mt-2"></span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="bg-white shadow rounded-lg w-1/6 flex flex-col items-center justify-center gap-1 p-4">
            <div className="bg-gray-300 h-4 w-24 rounded"></div>
            <div className="bg-gray-300 h-12 w-12 rounded-full mt-2"></div>
          </div>

          <div className="bg-yellow-400/80 shadow rounded-lg flex items-center justify-between overflow-x-auto px-6 flex-grow">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col items-center p-2">
                <div className="bg-gray-300 h-4 w-16 rounded"></div>
                <div className="bg-gray-300 h-4 w-12 rounded mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 days forecast data */}
      <section className="w-full flex flex-col gap-4">
        <h3 className="text-xl bg-gray-300 h-6 w-48 rounded"></h3>
        {[...Array(7)].map((_, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="bg-gray-300 h-6 w-24 rounded"></div>
              <div className="bg-gray-300 h-6 w-24 rounded"></div>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="bg-gray-300 h-4 w-4 rounded-full"></div>
                  <div className="bg-gray-300 h-4 w-20 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default WeatherSkeleton;
