// import React from "react";

// export default function Sidebar({ drugType, setDrugType }) {
//   return (
//     <aside className="w-72 bg-white border-r shadow-sm p-6 flex flex-col">
//       <h2 className="text-sm font-semibold text-gray-600 mb-6">
//         Drug Type
//       </h2>

//       <div className="space-y-4">

//         <button
//           onClick={() => setDrugType("prescription")}
//           className={`w-full p-3 rounded text-sm ${
//             drugType === "prescription"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Prescription Drugs
//         </button>

//         <button
//           onClick={() => setDrugType("homeopathic")}
//           className={`w-full p-3 rounded text-sm ${
//             drugType === "homeopathic"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Homeopathic Drugs
//         </button>

//       </div>

//       <div className="text-xs text-gray-400 mt-8 border-t pt-4">
//         Powered by DailyMed
//       </div>
//     </aside>
//   );
// }
import React from "react";
import { FlaskConical, Stethoscope, ChevronRight } from "lucide-react";

const MODES = [
  {
    id: "prescription",
    label: "Prescription",
    sublabel: "FDA-regulated drugs",
    icon: Stethoscope,
    endpoint: "/ask/prescription/",
  },
  {
    id: "homeopathic",
    label: "Homeopathic",
    sublabel: "Natural & herbal",
    icon: FlaskConical,
    endpoint: "/ask/homeopathic/",
  },
];

const SAMPLE_QUERIES = {
  prescription: [
    "labetalol overdose risk",
    "metformin dosage and warnings",
    "amoxicillin drug interactions",
    "lisinopril contraindications",
  ],
  homeopathic: [
    "arnica uses and dosage",
    "belladonna warnings",
    "nux vomica side effects",
    "pulsatilla indications",
  ],
};

export default function Sidebar({ drugType, setDrugType, onSampleQuery }) {
  return (
    <aside className="w-64 shrink-0 border-r border-slate-800 bg-slate-950 flex flex-col h-full">
      {/* Drug type */}
      <div className="p-4 border-b border-slate-800">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-3"
          style={{ fontFamily: "'DM Mono', monospace" }}>
          Drug Category
        </p>
        <div className="space-y-1">
          {MODES.map((m) => {
            const Icon = m.icon;
            const active = drugType === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setDrugType(m.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 group ${
                  active
                    ? "bg-cyan-500/10 border border-cyan-500/20"
                    : "hover:bg-slate-800/60 border border-transparent"
                }`}
              >
                <div className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${
                  active ? "bg-cyan-500/20" : "bg-slate-800 group-hover:bg-slate-700"
                }`}>
                  <Icon className={`w-3.5 h-3.5 ${active ? "text-cyan-400" : "text-slate-400"}`} strokeWidth={1.5} />
                </div>
                <div>
                  <div className={`text-sm font-medium ${active ? "text-cyan-300" : "text-slate-300"}`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {m.label}
                  </div>
                  <div className="text-xs text-slate-500">{m.sublabel}</div>
                </div>
                {active && <ChevronRight className="w-3 h-3 text-cyan-500 ml-auto" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sample queries */}
      <div className="p-4 flex-1">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-3"
          style={{ fontFamily: "'DM Mono', monospace" }}>
          Sample Queries
        </p>
        <div className="space-y-1">
          {SAMPLE_QUERIES[drugType].map((q) => (
            <button
              key={q}
              onClick={() => onSampleQuery(q)}
              className="w-full text-left text-xs text-slate-400 hover:text-cyan-300 px-2 py-1.5 rounded hover:bg-slate-800/60 transition-colors duration-100 truncate"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-500" style={{ fontFamily: "'DM Mono', monospace" }}>
            RAG · ChromaDB · Groq
          </span>
        </div>
      </div>
    </aside>
  );
}