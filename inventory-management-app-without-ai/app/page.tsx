"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setMode } from "./features/mode/modeSlice";
import Dashboard from "./dashboard/page";

export default function Home() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.mode.darkMode);

  useEffect(() => {
    const browserMode = localStorage.getItem("darkMode");
    if (browserMode === "true") {
      dispatch(setMode(true));
    } else if (browserMode === "false") {
      dispatch(setMode(false));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return <Dashboard />;
}
