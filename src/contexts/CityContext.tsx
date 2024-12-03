"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

type CityContextType = {
  city: string;
  setCity: (city: string) => void;
};

const CityContext = createContext<CityContextType | undefined>(undefined);

export function CityProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState<string>("Stockholm");

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
}
