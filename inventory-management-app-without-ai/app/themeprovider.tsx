"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const darkMode = useAppSelector((state) => state.mode.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return <>{children}</>;
}
