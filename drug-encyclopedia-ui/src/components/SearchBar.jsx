// import React from "react";
// import { Search, Loader2 } from "lucide-react";

// export default function SearchBar({
//   question,
//   setQuestion,
//   topK,
//   setTopK,
//   onSearch,
//   loading
// }) {
//   return (
//     <div className="max-w-5xl flex items-center gap-4">
      
//       {/* Search Input */}
//       <div className="relative flex-1">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//         <input
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           placeholder="Search indications, dosage, warnings..."
//           className="w-full border rounded-lg pl-9 pr-4 py-2 focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Results Selector */}
//       <div className="flex items-center text-sm whitespace-nowrap">
//         Results:
//         <input
//           type="number"
//           min={1}
//           max={10}
//           value={topK}
//           onChange={(e) => setTopK(Number(e.target.value))}
//           className="ml-2 w-16 border rounded px-2 py-1"
//         />
//       </div>

//       {/* Search Button */}
//       <button
//         onClick={onSearch}
//         disabled={loading}
//         className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center min-w-[90px]"
//       >
//         {loading ? (
//           <Loader2 className="w-4 h-4 animate-spin" />
//         ) : (
//           "Search"
//         )}
//       </button>
//     </div>
//   );
// }
import React, { useRef } from "react";
import { Search, Loader2, Command } from "lucide-react";

export default function SearchBar({ question, setQuestion, onSearch, loading, persona }) {
  const inputRef = useRef(null);

  const personaMeta = {
    patient:   { label: "Patient mode",   color: "text-teal-400",  dot: "bg-teal-400" },
    student:   { label: "Student mode",   color: "text-blue-400",  dot: "bg-blue-400" },
    clinician: { label: "Clinician mode", color: "text-amber-400", dot: "bg-amber-400" },
  };

  const meta = personaMeta[persona] || personaMeta.patient;

  const handleKey = (e) => {
    if (e.key === "Enter" && !loading) onSearch();
  };

  return (
    <div className="w-full">
      {/* Active persona indicator */}
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
        <span className={`text-xs font-medium ${meta.color}`}
          style={{ fontFamily: "'DM Mono', monospace" }}>
          {meta.label}
        </span>
        <span className="text-xs text-slate-600 ml-auto hidden sm:flex items-center gap-1">
          <Command className="w-3 h-3" /> Enter to search
        </span>
      </div>

      {/* Search field */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-4 h-4 text-slate-500 pointer-events-none" />
        <input
          ref={inputRef}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Search indications, dosage, overdose risk, interactions…"
          className="w-full bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-xl pl-11 pr-36 py-3.5 text-sm focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-200"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
        <div className="absolute right-2 flex items-center gap-2">
          <button
            onClick={onSearch}
            disabled={loading || !question.trim()}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-150"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Search className="w-3.5 h-3.5" />
            )}
            {loading ? "Searching" : "Search"}
          </button>
        </div>
      </div>
    </div>
  );
}