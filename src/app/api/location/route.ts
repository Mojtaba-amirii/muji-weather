import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Latitude and longitude are required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${encodeURIComponent(
        lat
      )}&lon=${encodeURIComponent(lon)}&appid=${
        process.env.OPENWEATHER_API_KEY
      }&cnt=40`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    return NextResponse.json(data);
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
