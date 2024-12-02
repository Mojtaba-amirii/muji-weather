import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (!req.url) {
    return NextResponse.json({ error: "URL is missing" }, { status: 400 });
  }
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const city = searchParams.get("city") || "Stockholm";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        city
      )}&appid=${process.env.OPENWEATHER_API_KEY}&cnt=40`
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
