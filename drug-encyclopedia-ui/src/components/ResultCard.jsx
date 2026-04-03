// import React from "react";
// import { FileText } from "lucide-react";

// export default function ResultsCard({ result, loading }) {

//   if (loading) {
//     return <div className="mt-10 text-gray-400">Searching...</div>;
//   }

//   if (!result) {
//     return (
//       <div className="mt-12 text-center text-gray-400">
//         <FileText className="mx-auto mb-3 w-10 h-10" />
//         Search for a drug to view details.
//       </div>
//     );
//   }

//   if (result.message) {
//     return (
//       <div className="mt-8 text-gray-500">
//         {result.message}
//       </div>
//     );
//   }

//   if (result.analysis) {
//     return (
//       <div className="mt-10 max-w-4xl bg-white border rounded-lg p-8 shadow-sm">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">
//           Clinical Assessment
//         </h2>

//         <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
//           {result.analysis}
//         </pre>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-10 max-w-4xl bg-white border rounded-lg p-8 shadow-sm space-y-6">

//       <div>
//         <h2 className="text-2xl font-bold text-gray-800">
//           {result.drug}
//         </h2>
//       </div>

//       {result.uses && (
//         <Section title="Uses" content={result.uses} />
//       )}

//       {result.dosage && (
//         <Section title="Dosage" content={result.dosage} />
//       )}

//       {result.side_effects && (
//         <Section title="Side Effects" content={result.side_effects} />
//       )}

//       {result.warnings && (
//         <Section title="Warnings" content={result.warnings} />
//       )}

//       {result.interactions && (
//         <Section title="Interactions" content={result.interactions} />
//       )}

//       {result.contraindications && (
//         <Section title="Contraindications" content={result.contraindications} />
//       )}

//     </div>
//   );
// }

// function Section({ title, content }) {
//   return (
//     <div>
//       <h3 className="text-lg font-semibold text-gray-700 mb-2">
//         {title}
//       </h3>
//       <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
//         {content}
//       </p>
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  FileText, AlertTriangle, Pill, Activity,
  ChevronDown, ChevronUp, Copy, Check, Stethoscope,
  BookOpen, User
} from "lucide-react";

const PERSONA_CONFIG = {
  patient: {
    label: "Patient",
    icon: User,
    accent: "cyan",
    border: "border-teal-500/20",
    badge: "bg-teal-500/10 text-teal-300 border border-teal-500/20",
    dot: "bg-teal-400",
  },
  student: {
    label: "Student",
    icon: BookOpen,
    accent: "blue",
    border: "border-blue-500/20",
    badge: "bg-blue-500/10 text-blue-300 border border-blue-500/20",
    dot: "bg-blue-400",
  },
  clinician: {
    label: "Clinician",
    icon: Stethoscope,
    accent: "amber",
    border: "border-amber-500/20",
    badge: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
    dot: "bg-amber-400",
  },
};

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={handle}
      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors px-2 py-1 rounded hover:bg-slate-800"
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function RawDataAccordion({ raw }) {
  const [open, setOpen] = useState(false);
  if (!raw) return null;

  const fields = [
    { key: "uses",             label: "Uses" },
    { key: "dosage",           label: "Dosage" },
    { key: "side_effects",     label: "Side Effects" },
    { key: "warnings",         label: "Warnings" },
    { key: "interactions",     label: "Interactions" },
    { key: "contraindications",label: "Contraindications" },
  ].filter(f => raw[f.key]);

  return (
    <div className="mt-4 border border-slate-800 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-900 hover:bg-slate-800/80 transition-colors text-left"
      >
        <span className="text-xs font-medium text-slate-400 flex items-center gap-2"
          style={{ fontFamily: "'DM Mono', monospace" }}>
          <FileText className="w-3.5 h-3.5" />
          Raw label data — {raw.drug}
        </span>
        {open
          ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
          : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
      </button>

      {open && (
        <div className="divide-y divide-slate-800">
          {fields.map(f => (
            <div key={f.key} className="px-4 py-3 bg-slate-950">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-1.5"
                style={{ fontFamily: "'DM Mono', monospace" }}>
                {f.label}
              </p>
              <p className="text-xs text-slate-400 whitespace-pre-wrap leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {raw[f.key]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Parses markdown-style **bold** headers from LLM output into styled sections
function FormattedAnswer({ text }) {
  if (!text) return null;

  const lines = text.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />;

        // **Header** line
        if (line.startsWith("**") && line.includes("**")) {
          const header = line.replace(/\*\*/g, "").replace(/ —.*/, "").trim();
          const rest = line.replace(/\*\*[^*]+\*\*/, "").replace(/^ —\s*/, "");
          return (
            <div key={i} className="mt-4 first:mt-0">
              <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1"
                style={{ fontFamily: "'DM Mono', monospace" }}>
                {header}
              </h4>
              {rest && (
                <p className="text-sm text-slate-300 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {rest}
                </p>
              )}
            </div>
          );
        }

        // Bullet point
        if (line.startsWith("- ") || line.startsWith("• ")) {
          return (
            <div key={i} className="flex gap-2 items-start pl-1">
              <span className="text-cyan-500 mt-1.5 shrink-0 text-xs">▸</span>
              <p className="text-sm text-slate-300 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {line.replace(/^[-•]\s/, "")}
              </p>
            </div>
          );
        }

        // Regular line
        return (
          <p key={i} className="text-sm text-slate-300 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {line}
          </p>
        );
      })}
    </div>
  );
}

// Clinical analysis response (from /clinical endpoint)
function ClinicalCard({ result }) {
  const sections = result.analysis
    ? result.analysis.split("\n\n").filter(Boolean)
    : [];

  const parsedSections = sections.map(block => {
    const lines = block.split("\n");
    const header = lines[0]?.replace(":", "").trim();
    const body = lines.slice(1).join("\n").trim() || lines[0];
    return { header: lines.length > 1 ? header : null, body };
  });

  const sectionColors = {
    "Safety Assessment": "text-red-400",
    "Reason":            "text-amber-400",
    "Source Evidence":   "text-cyan-400",
  };

  return (
    <div className="bg-slate-900 border border-red-500/20 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-red-400" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-100"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Clinical Safety Assessment
            </h2>
            <p className="text-xs text-slate-500"
              style={{ fontFamily: "'DM Mono', monospace" }}>
              {result.question}
            </p>
          </div>
        </div>
        <CopyButton text={result.analysis} />
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {parsedSections.map((s, i) => (
          <div key={i} className={`${i > 0 ? "border-t border-slate-800 pt-4" : ""}`}>
            {s.header && (
              <p className={`text-xs font-semibold uppercase tracking-widest mb-1.5 ${sectionColors[s.header] || "text-slate-400"}`}
                style={{ fontFamily: "'DM Mono', monospace" }}>
                {s.header}
              </p>
            )}
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Persona-based response (from /ask/prescription/ or /ask/homeopathic/)
function PersonaCard({ result }) {
  const cfg = PERSONA_CONFIG[result.persona] || PERSONA_CONFIG.patient;
  const Icon = cfg.icon;

  return (
    <div className={`bg-slate-900 border ${cfg.border} rounded-xl p-6`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center`}>
            <Pill className="w-4 h-4 text-slate-300" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-100"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {result.drug || result.raw?.drug || "Drug Information"}
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.badge}`}
                style={{ fontFamily: "'DM Mono', monospace" }}>
                {cfg.label} view
              </span>
            </div>
          </div>
        </div>
        <CopyButton text={result.answer} />
      </div>

      {/* Answer */}
      <div className="bg-slate-950/60 rounded-lg p-4 border border-slate-800">
        <FormattedAnswer text={result.answer} />
      </div>

      {/* Raw data accordion */}
      <RawDataAccordion raw={result.raw} />
    </div>
  );
}

// Empty / loading / error states
export default function ResultsCard({ result, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="relative">
          <div className="w-10 h-10 rounded-full border-2 border-slate-700" />
          <div className="w-10 h-10 rounded-full border-2 border-t-cyan-500 animate-spin absolute inset-0" />
        </div>
        <p className="text-sm text-slate-500" style={{ fontFamily: "'DM Mono', monospace" }}>
          Retrieving from knowledge base…
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-2">
          <Activity className="w-5 h-5 text-slate-600" strokeWidth={1.5} />
        </div>
        <p className="text-sm font-medium text-slate-400"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          No results yet
        </p>
        <p className="text-xs text-slate-600 max-w-xs"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Enter a drug name or clinical question above. Use the sidebar samples to get started.
        </p>
      </div>
    );
  }

  if (result.message) {
    return (
      <div className="flex items-center gap-3 p-4 bg-slate-900 border border-slate-700 rounded-xl">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        <p className="text-sm text-slate-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {result.message}
        </p>
      </div>
    );
  }

  // Clinical endpoint response
  if (result.analysis) return <ClinicalCard result={result} />;

  // Persona endpoint response
  if (result.answer) return <PersonaCard result={result} />;

  return null;
}