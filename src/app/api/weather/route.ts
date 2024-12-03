import { NextRequest, NextResponse } from "next/server";
import { GeoResponse, WeatherData } from "@/types/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const query = searchParams.get("q");

  const API_KEY = process.env.OPENWEATHER_API_KEY;
  if (!API_KEY) {
    return NextResponse.json(
      { error: "API key is not configured" },
      { status: 500 }
    );
  }

  try {
    if (query) {
      // Geocoding API - For city search/autocomplete
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        query
      )}&limit=5&appid=${API_KEY}`;

      const response = await fetch(geoUrl);
      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.statusText}`);
      }

      const data: GeoResponse = await response.json();
      const suggestions = data.map((city) => `${city.name}, ${city.country}`);
      return NextResponse.json(suggestions);
    }

    // Weather Forecast API - For actual weather data
    const forecastUrl =
      lat && lon
        ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&cnt=40`
        : `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
            city || "Stockholm"
          )}&appid=${API_KEY}&cnt=40`;

    const response = await fetch(forecastUrl);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data: WeatherData = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
