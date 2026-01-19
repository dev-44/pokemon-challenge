import React from "react";
import { Header } from "./Header";
import { ToastContainer } from "@/components/shared/Toast";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <ToastContainer />
      <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="text-sm">Built for FullTimeForce Challenge</p>
          <p className="text-xs mt-1">
            Pokémon data from{" "}
            <a
              href="https://pokeapi.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              PokéAPI
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};
