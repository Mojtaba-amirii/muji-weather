import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        query
      )}&limit=40&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch city data");
    }

    const data = await response.json();
    const cityNames = data.map(
      (city: { name: string; country: string }) =>
        `${city.name}, ${city.country}`
    );

    return NextResponse.json(cityNames);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
