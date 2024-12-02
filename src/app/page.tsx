"use client";

import { WeatherData } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingSpinner from "./Loading";
import { format, parseISO } from "date-fns";
import { Container } from "@/components/Container";
import { KelvinToCelsius } from "@/utils/KelvinToCelsius";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch("/api/weather");
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data: WeatherData = await response.json();
        console.log("Weather data:", data);
        setWeatherData(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="container mx-auto">Error: {error}</div>;
  }

  if (!weatherData) {
    return <div className="container mx-auto">Loading...</div>;
  }

  return (
    <main className="container mx-auto">
      {/* today data */}
      <section>
        <h2 className=" text-xl">
          {format(parseISO(weatherData.list[0].dt_txt), "EEEE") ??
            "date not found"}{" "}
          <span className=" text-lg">
            {" "}
            ({format(parseISO(weatherData.list[0].dt_txt), "dd/MM/yyyy")}) -{" "}
          </span>
          {weatherData.city.name}
        </h2>

        <Container className=" gap-10 px-6 items-center">
          <div className=" flex flex-col px-4 gap-1 w-1/5">
            <span className=" text-5xl">
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
          <div className=" flex gap-10 sm:gap-16 justify-between w-full overflow-x-auto">
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
          <Container className=" w-1/6 flex flex-col items-center justify-center gap-1 ">
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

          <Container className=" flex items-center justify-between bg-yellow-400/80 overflow-x-auto"></Container>
        </div>
      </section>

      {/* 7 days forecast data */}
      <section className=" w-full flex flex-col gap-4">
        <h3 className=" text-xl"> Forecast (7 days)</h3>
      </section>
    </main>
  );
}
