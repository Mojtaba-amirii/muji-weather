import { ReactNode } from "react";
import { BsWind } from "react-icons/bs";
import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";

export interface WeatherDetailsProps {
  visibility: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export const WeatherDetails = (props: WeatherDetailsProps) => {
  const { visibility, humidity, windSpeed, airPressure, sunrise, sunset } =
    props;
  return (
    <>
      <SingleWeatherDetail
        value={visibility}
        information="Visibility"
        icon={<LuEye />}
      />
      <SingleWeatherDetail
        value={humidity}
        information="Humidity"
        icon={<FiDroplet />}
      />
      <SingleWeatherDetail
        value={windSpeed}
        information="Wind Speed"
        icon={<BsWind />}
      />
      <SingleWeatherDetail
        value={airPressure}
        information="Air Pressure"
        icon={<ImMeter />}
      />
      <SingleWeatherDetail
        value={sunrise}
        information="Sunrise"
        icon={<LuSunrise />}
      />
      <SingleWeatherDetail
        value={sunset}
        information="Sunset"
        icon={<LuSunset />}
      />
    </>
  );
};

export interface SingleWeatherDetailProps {
  information: string;
  icon: ReactNode;
  value: string;
}

const SingleWeatherDetail = (props: SingleWeatherDetailProps) => {
  const { information, icon, value } = props;

  return (
    <div className=" flex flex-col items-center justify-between gap-2 text-xs font-semibold text-black/80">
      <p className=" whitespace-nowrap"> {information}</p>
      <span className=" text-3xl"> {icon}</span>
      <p className=" whitespace-nowrap"> {value}</p>
    </div>
  );
};
