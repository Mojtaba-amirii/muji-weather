import Image from "next/image";

import { Container } from "./Container";
import { KelvinToCelsius } from "@/utils/KelvinToCelsius";
import { WeatherDetails, WeatherDetailsProps } from "./WeatherDetails";

export interface ForecastWeatherDetailsProps extends WeatherDetailsProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export const ForecastWeatherDetails = (props: ForecastWeatherDetailsProps) => {
  const { weatherIcon, date, day, temp, feels_like, description } = props;

  return (
    <Container className=" gap-4">
      <section className=" flex gap-4 items-center sm:px-4">
        <div className=" flex flex-col items-center gap-1">
          <Image
            src={`http://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
            alt={description}
            priority
            width={50}
            height={50}
            className=" object-contain"
          />
          <h2 className=" text-sm font-medium"> {day}</h2>
          <p> {date}</p>
        </div>

        <div className=" text-right flex flex-col sm:px-4">
          <span className=" text-xl sm:text-4xl">
            {KelvinToCelsius(temp)}°C
          </span>
          <p className=" text-xs space-x-1 whitespace-nowrap">
            Feels like {KelvinToCelsius(feels_like) ?? "N/A"}°C
          </p>
          <p className=" capitalize"> {description} </p>
        </div>
      </section>

      <section className=" w-full flex justify-between gap-4 overflow-x-auto px-4">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
};
