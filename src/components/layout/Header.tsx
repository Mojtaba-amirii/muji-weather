"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { MdMyLocation, MdOutlineLocationCity, MdWbSunny } from "react-icons/md";

import Link from "next/link";
import Search from "../Search";
import { useCity } from "@/contexts/CityContext";

const SuggestionBox = ({
  suggestions,
  showSuggestions,
  error,
  handleSuggestionClick,
}: {
  suggestions: string[];
  showSuggestions: boolean;
  error: string | null;
  handleSuggestionClick: (city: string) => void;
}) => {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className=" absolute top-11 left-0 border backdrop-blur-xs z-10 border-gray-400 rounded-md min-w-52 flex flex-col gap-1 p-2">
          {error && suggestions.length === 0 && (
            <li className=" text-red-500 rounded-sm p-1">Error: {error}</li>
          )}
          {suggestions.map((city, index) => (
            <li
              key={index}
              className=" cursor-pointer hover:bg-gray-200 rounded-sm p-1"
              onClick={() => handleSuggestionClick(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const Header = () => {
  const [searchCity, setSearchCity] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const { city, setCity } = useCity();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchCity(value);
    if (value.length > 1) {
      try {
        const response = await fetch(
          `/api/weather?q=${encodeURIComponent(value)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data");
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSubmitSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchCity.length < 2) {
      return setError("Please enter a valid city name");
    }
    try {
      setCity(searchCity);
      setShowSuggestions(false);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch weather data");
    }
  };

  const handleCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `/api/weather?lat=${latitude}&lon=${longitude}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          const cityName = data.city.name;
          setCity(cityName);
          setSearchCity(cityName);
        } catch (error) {
          console.error(error);
          setError("Failed to fetch location data");
        }
      });
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };

  return (
    <header className=" sticky top-0 left-0 z-10 bg-white shadow-xs py-2">
      <nav className=" container mx-auto flex flex-col sm:flex-row justify-between items-center ">
        <section className="flex flex-row items-center">
          <Link href="/">
            <h1 className="text-xl font-bold text-gray-800 p-4">
              Muji Weather
            </h1>
          </Link>
          <MdWbSunny className="text-4xl text-yellow-500" />
        </section>

        <section className="flex flex-col sm:flex-row items-center w-fit">
          <span className=" flex justify-center items-center mb-3 sm:mb-0">
            <MdMyLocation
              title="Use my location"
              onClick={handleCurrentLocation}
              className="text-3xl text-gray-500 cursor-pointer mr-6 hover:text-gray-700"
            />
            <MdOutlineLocationCity className="text-3xl text-gray-500 cursor-pointer mr-2 " />
            <p className="text-blue-400 mr-6 text-sm"> Current city: {city}</p>
          </span>

          <div className=" relative px-4 ">
            <Search
              value={searchCity}
              onChange={handleChange}
              onSubmit={handleSubmitSearch}
            />

            <SuggestionBox
              suggestions={suggestions}
              showSuggestions={showSuggestions}
              error={error}
              handleSuggestionClick={(selectedCity) => {
                setSearchCity(selectedCity);
                setCity(selectedCity);
                setSuggestions([]);
                setShowSuggestions(false);
              }}
            />
          </div>
        </section>
      </nav>
    </header>
  );
};

export default Header;
