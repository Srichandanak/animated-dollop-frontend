import React from "react";
import { Pill } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <Pill className="w-6 h-6 text-blue-600" />
        <h1 className="text-lg font-semibold text-gray-800">
          Drug Encyclopedia
        </h1>
      </div>

      <div className="text-sm text-gray-500">
        Clinical Retrieval System
      </div>
    </header>
  );
}
