// import React, { useState } from "react";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import SearchBar from "./components/SearchBar";
// import ResultsCard from "./components/ResultCard";
// import { searchDrugs, clinicalQuery } from "./api";


// export default function App() {
//   const [drugType, setDrugType] = useState("prescription");
//   const [question, setQuestion] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     if (!question.trim()) return;

//     setLoading(true);
//     setError(null);

//     try {
//       let data;

//       // If question looks like a clinical question
//       if (
//         question.toLowerCase().includes("safe") ||
//         question.toLowerCase().includes("compare") ||
//         question.toLowerCase().includes("can") ||
//         question.toLowerCase().includes("?")
//       ) {
//         data = await clinicalQuery(question);
//       } else {
//         data = await searchDrugs({
//           question,
//           type: drugType
//         });
//       }

//       setResult(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex bg-gray-100">
//       <Sidebar
//         drugType={drugType}
//         setDrugType={setDrugType}
//       />

//       <div className="flex-1 flex flex-col">
//         <Navbar />

//         <main className="flex-1 p-8 overflow-y-auto">

//           <SearchBar
//             question={question}
//             setQuestion={setQuestion}
//             onSearch={handleSearch}
//             loading={loading}
//           />

//           {error && (
//             <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
//               {error}
//             </div>
//           )}

//           <ResultsCard result={result} loading={loading} />
//         </main>
//       </div>
//     </div>
//   );
// }

import React, { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import ResultsCard from "./components/ResultCard";
import { searchDrugs, clinicalQuery } from "./api";

const API_BASE = "http://localhost:8000";

export default function App() {
  const [persona, setPersona]   = useState("patient");
  const [drugType, setDrugType] = useState("prescription");
  const [question, setQuestion] = useState("");
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);

  // Accept optional overrides so persona/question changes can immediately search
  const handleSearch = useCallback(async (overrideQuestion, overridePersona) => {
    const q = overrideQuestion ?? question;
    const p = overridePersona  ?? persona;
    if (!q.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const endpoint =
        drugType === "prescription"
          ? `${API_BASE}/ask/prescription/`
          : `${API_BASE}/ask/homeopathic/`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, persona: p }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `HTTP ${res.status}`);
      }

      setResult(await res.json());
    } catch (e) {
      setResult({ message: `Request failed: ${e.message}` });
    } finally {
      setLoading(false);
    }
  }, [question, persona, drugType]);

  // When persona changes in navbar: update state AND re-search if there's an active question
  const handlePersonaChange = (newPersona) => {
    setPersona(newPersona);
    if (question.trim()) {
      handleSearch(question, newPersona); // pass new persona directly, don't wait for state
    }
  };

  // When sidebar sample is clicked: set question AND search immediately
  const handleSampleQuery = (q) => {
    setQuestion(q);
    handleSearch(q, persona); // pass question directly, don't wait for state
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body, #root { height: 100%; margin: 0; padding: 0; }
        body { background: #020817; color: #e2e8f0; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}</style>

      <div className="flex flex-col h-screen overflow-hidden bg-slate-950">
        <Navbar persona={persona} setPersona={handlePersonaChange} />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            drugType={drugType}
            setDrugType={setDrugType}
            onSampleQuery={handleSampleQuery}
          />

          <main className="flex-1 overflow-y-auto bg-slate-950">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(148,163,184,0.04) 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative max-w-3xl mx-auto px-6 py-8">
              <div className="mb-8">
                <SearchBar
                  question={question}
                  setQuestion={setQuestion}
                  onSearch={() => handleSearch()}
                  loading={loading}
                  persona={persona}
                />
              </div>
              <ResultsCard result={result} loading={loading} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}