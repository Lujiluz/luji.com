"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const SplashContext = createContext<{
  isSplashFinished: boolean;
  setIsSplashFinished: (val: boolean) => void;
}>({
  isSplashFinished: false,
  setIsSplashFinished: () => {},
});

export const SplashProvider = ({ children }: { children: ReactNode }) => {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  return <SplashContext.Provider value={{ isSplashFinished, setIsSplashFinished }}>{children}</SplashContext.Provider>;
};

export const useSplash = () => useContext(SplashContext);
