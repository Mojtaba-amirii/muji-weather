"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { format, fromUnixTime, parseISO } from "date-fns";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

import { Container } from "@/components/Container";
import { KelvinToCelsius } from "@/utils/KelvinToCelsius";
import { WeatherDetails } from "@/components/WeatherDetails";
import { meterToKilometer } from "@/utils/meterToKilometer";
import { ForecastWeatherDetails } from "@/components/ForecastWeatherDetails";
import { useCity } from "@/contexts/CityContext";
import WeatherSkeleton from "@/components/WeatherAppSkeleton";
import { WeatherData } from "@/types/types";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { city } = useCity();

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/weather?city=${encodeURIComponent(city)}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch weather data: ${response.statusText}`
          );
        }
        const data: WeatherData = await response.json();
        setWeatherData(data);
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  if (isLoading) {
    return <WeatherSkeleton />;
  }
  if (error) {
    return <div className="container mx-auto text-red-500">Error: {error}</div>;
  }
  if (!weatherData) {
    return <div className="container mx-auto">No weather data available </div>;
  }

  const uniqueDates = [
    ...new Set(
      weatherData.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDataForEveryDay = uniqueDates.map((date) => {
    return weatherData.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  return (
    <main className="container mx-auto my-16 flex flex-col gap-12 px-4">
      {/* today data */}
      <section className=" flex flex-col gap-y-6">
        <h2 className=" text-2xl font-semibold">
          {format(parseISO(weatherData.list[0].dt_txt), "EEEE") ??
            "date not found"}{" "}
          <span className=" text-lg">
            {" "}
            ({format(parseISO(weatherData.list[0].dt_txt), "dd/MM/yyyy")}) -{" "}
          </span>
          {weatherData.city.name}
        </h2>

        <Container className=" gap-10 sm:px-6 items-center">
          <div className=" flex flex-col sm:px-4 gap-1 w-1/6">
            <span className=" text-3xl sm:text-5xl">
              {KelvinToCelsius(weatherData.list[0].main.temp)}°C
            </span>
            <p className=" text-xs space-x-1 whitespace-nowrap">
              Feels like{" "}
              {KelvinToCelsius(weatherData.list[0].main.feels_like) ?? "N/A"}°C
            </p>
            <p className="text-xs ">
              min {KelvinToCelsius(weatherData.list[0].main.temp_min)}°
              <BsArrowDown className="inline" size={12} /> max{" "}
              {KelvinToCelsius(weatherData.list[0].main.temp_max)}°
              <BsArrowUp className="inline" size={12} />
            </p>
          </div>
          <div className=" flex gap-6 sm:gap-16 justify-between w-full overflow-x-auto">
            {weatherData.list.map((forecast) => (
              <div
                key={forecast.dt}
                className=" flex flex-col items-center gap-1"
              >
                <span className=" text-sm">
                  {format(parseISO(forecast.dt_txt), "HH:mm a")}
                  <Image
                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`}
                    alt={forecast.weather[0].description}
                    width={50}
                    height={50}
                  />
                </span>
                <span className=" text-sm">
                  {KelvinToCelsius(forecast.main.temp)}°C
                </span>
              </div>
            ))}
          </div>
        </Container>

        <div className=" flex gap-4">
          <Container className=" flex-1 flex-col items-center justify-center gap-1 ">
            <p className=" capitalize text-center">
              {weatherData.list[0].weather[0].description}
            </p>
            <Image
              src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@4x.png`}
              alt={weatherData.list[0].weather[0].description}
              width={50}
              height={50}
            />
          </Container>

          <Container className=" flex-3 items-center justify-between bg-yellow-400/80 overflow-x-auto px-6">
            <WeatherDetails
              visibility={meterToKilometer(weatherData.list[0].visibility)}
              humidity={`${weatherData.list[0].main.humidity}%`}
              windSpeed={`${(weatherData.list[0].wind.speed * 3.6).toFixed(
                0
              )} km/h`}
              airPressure={`${weatherData.list[0].main.pressure} hPa`}
              sunrise={format(
                fromUnixTime(weatherData.city.sunrise),
                "HH:mm a"
              )}
              sunset={format(fromUnixTime(weatherData.city.sunset), "HH:mm a")}
            />
          </Container>
        </div>
      </section>

      {/* 7 days forecast data */}
      <section className=" w-full flex flex-col gap-4">
        <h3 className=" text-2xl font-semibold"> Forecast (7 days)</h3>
        {firstDataForEveryDay.map(
          (d, i) =>
            d && (
              <ForecastWeatherDetails
                key={i}
                description={d.weather[0].description}
                feels_like={d.main.feels_like}
                temp={d.main.temp}
                temp_max={d.main.temp_max}
                temp_min={d.main.temp_min}
                weatherIcon={d.weather[0].icon}
                date={format(parseISO(d.dt_txt), "dd/MM")}
                day={format(parseISO(d.dt_txt), "EEEE")}
                visibility={meterToKilometer(d.visibility)}
                humidity={`${d.main.humidity}%`}
                windSpeed={`${(d.wind.speed * 3.6).toFixed(0)} km/h`}
                airPressure={`${d.main.pressure} hPa`}
                sunrise={format(
                  fromUnixTime(weatherData.city.sunrise),
                  "HH:mm a"
                )}
                sunset={format(
                  fromUnixTime(weatherData.city.sunset),
                  "HH:mm a"
                )}
              />
            )
        )}
      </section>
    </main>
  );
}
