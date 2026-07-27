"use client";
import React from "react";
import Navbar from "@/(components)/Navbar";
import Sidebar from "../Sidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const sideBarCollapse = useAppSelector(
    (state: RootState) => state.mode.sideBarCollapse,
  );
  const darkMode = useAppSelector((state: RootState) => state.mode.darkMode);

  return (
    <div className={`flex min-h-screen bg-background text-foreground w-full`}>
      {/* SIDEBAR SECTION */}
      <Sidebar />

      {/* MAIN APP SECTION */}
      <main
        className={`
          flex-1
          min-h-screen
          bg-background
          px-8
          py-6
          transition-all
          duration-300
          ${sideBarCollapse ? "md:ml-20" : "md:ml-72"}
        `}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
}
