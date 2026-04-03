// import React from "react";
// import { Pill } from "lucide-react";

// export default function Navbar() {
//   return (
//     <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
//       <div className="flex items-center gap-3">
//         <Pill className="w-6 h-6 text-blue-600" />
//         <h1 className="text-lg font-semibold text-gray-800">
//           Drug Encyclopedia
//         </h1>
//       </div>

//       <div className="text-sm text-gray-500">
//         Clinical Retrieval System
//       </div>
//     </header>
//   );
// }
import React from "react";
import { Activity } from "lucide-react";

export default function Navbar({ persona, setPersona }) {
  const personas = [
    { id: "patient",   label: "Patient",   hint: "Simple language" },
    { id: "student",   label: "Student",   hint: "Structured detail" },
    { id: "clinician", label: "Clinician", hint: "Full clinical" },
  ];

  return (
    <header className="h-14 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
          <Activity className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-white tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            PharmaPedia
          </span>
          <span className="text-xs text-slate-500 hidden sm:block" style={{ fontFamily: "'DM Mono', monospace" }}>
            Drug Intelligence System
          </span>
        </div>
      </div>

      {/* Persona switcher */}
      <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
        {personas.map((p) => (
          <button
            key={p.id}
            onClick={() => setPersona(p.id)}
            title={p.hint}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
              persona === p.id
                ? "bg-cyan-500 text-slate-950"
                : "text-slate-400 hover:text-slate-200"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {p.label}
          </button>
        ))}
      </div>
    </header>
  );
}