// // import React, { useState } from "react";
// // import { Search, Pill, AlertCircle, Loader2, FileText, ChevronDown, ChevronUp, Moon, Sun } from "lucide-react";

// // const API_URL = "http://localhost:8000/ask";

// // function App() {
// //   const [question, setQuestion] = useState("");
// //   const [topK, setTopK] = useState(5);
// //   const [loading, setLoading] = useState(false);
// //   const [results, setResults] = useState([]);
// //   const [error, setError] = useState(null);
// //   const [expandedCards, setExpandedCards] = useState({});
// //   const [darkMode, setDarkMode] = useState(true);

// //   const handleSubmit = async () => {
// //     if (!question.trim()) return;

// //     setLoading(true);
// //     setError(null);
// //     setResults([]);
// //     setExpandedCards({});

// //     try {
// //       const res = await fetch(API_URL, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ question, top_k: topK }),
// //       });

// //       if (!res.ok) {
// //         const text = await res.text();
// //         throw new Error(`Backend error: ${res.status} ${text}`);
// //       }

// //       const data = await res.json();
// //       setResults(data.contexts || []);
// //     } catch (err) {
// //       setError(err.message || "Unknown error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === 'Enter') {
// //       handleSubmit();
// //     }
// //   };

// //   const toggleExpanded = (idx) => {
// //     setExpandedCards(prev => ({ ...prev, [idx]: !prev[idx] }));
// //   };

// //   const suggestedQueries = [
// //     "dosage for joint pain homeopathic remedy",
// //     "side effects of aspirin",
// //     "warnings for blood pressure medication",
// //     "pediatric dosing information"
// //   ];

// //   return (
// //     <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700' : 'bg-gradient-to-br from-blue-50 via-white to-cyan-50'}`}>
// //       {/* Header */}
// //       <header className={`border-b ${darkMode ? 'border-slate-600 bg-slate-800/50' : 'border-blue-200 bg-white/80'} backdrop-blur-sm`}>
// //         <div className="max-w-6xl mx-auto px-6 py-6">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <div className={`p-2 ${darkMode ? 'bg-slate-700' : 'bg-blue-100'} rounded-xl`}>
// //                 <Pill className={`w-7 h-7 ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
// //               </div>
// //               <div>
// //                 <h1 className={`text-2xl font-bold ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>Drug Encyclopedia</h1>
// //                 <p className={`text-sm ${darkMode ? 'text-cyan-300' : 'text-blue-500'}`}>Powered by DailyMed RAG System</p>
// //               </div>
// //             </div>
// //             <button
// //               onClick={() => setDarkMode(!darkMode)}
// //               className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-blue-100 hover:bg-blue-200'} transition-colors`}
// //             >
// //               {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       <main className="max-w-6xl mx-auto px-6 py-8">
// //         {/* Search Section */}
// //         <section className="mb-8">
// //           <div className="relative">
// //             <div className="relative">
// //               <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-blue-400'}`} />
// //               <input
// //                 type="text"
// //                 value={question}
// //                 onChange={(e) => setQuestion(e.target.value)}
// //                 onKeyPress={handleKeyPress}
// //                 placeholder="Ask about indications, dosage, warnings, side effects..."
// //                 className={`w-full border rounded-2xl pl-12 pr-4 py-4 ${darkMode ? 'border-slate-600 text-white placeholder-slate-400 bg-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400' : 'border-blue-300 text-gray-900 placeholder-blue-400 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500'} transition-colors`}
// //               />
// //             </div>

// //             <div className="flex items-center justify-between mt-4">
// //               <div className="flex items-center gap-4">
// //                 <div className={`flex items-center gap-2 ${darkMode ? 'bg-slate-700' : 'bg-blue-100'} backdrop-blur rounded-lg px-3 py-2 border ${darkMode ? 'border-slate-600' : 'border-blue-300'}`}>
// //                   <span className={`text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-blue-700'}`}>Results</span>
// //                   <input
// //                     type="number"
// //                     min={1}
// //                     max={10}
// //                     value={topK}
// //                     onChange={(e) => setTopK(Number(e.target.value) || 5)}
// //                     className={`w-12 ${darkMode ? 'bg-slate-600 border-slate-500 text-white focus:border-cyan-400' : 'bg-white border-blue-300 text-gray-900 focus:border-blue-500'} border rounded px-2 py-1 text-sm text-center`}
// //                   />
// //                 </div>
// //               </div>

// //               <button
// //                 onClick={handleSubmit}
// //                 disabled={loading}
// //                 className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold ${darkMode ? 'bg-cyan-600 border-cyan-500 hover:bg-cyan-700 hover:border-cyan-400 text-white' : 'bg-blue-600 border-blue-500 hover:bg-blue-700 hover:border-blue-400 text-white'} border disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
// //               >
// //                 {loading ? (
// //                   <>
// //                     <Loader2 className="w-4 h-4 animate-spin" />
// //                     Searching...
// //                   </>
// //                 ) : (
// //                   <>
// //                     <Search className="w-4 h-4" />
// //                     Search
// //                   </>
// //                 )}
// //               </button>
// //             </div>

// //             {error && (
// //               <div className={`mt-4 flex items-start gap-3 ${darkMode ? 'bg-red-900/50 border-red-700/50' : 'bg-red-50 border-red-200'} rounded-xl p-4`}>
// //                 <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
// //                 <div>
// //                   <p className={`text-sm font-medium ${darkMode ? 'text-red-300' : 'text-red-700'}`}>Error</p>
// //                   <p className={`text-sm mt-1 ${darkMode ? 'text-red-200' : 'text-red-600'}`}>{error}</p>
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Suggested Queries */}
// //           {results.length === 0 && !loading && (
// //             <div className="mt-6">
// //               <p className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-blue-600'} mb-3`}>SUGGESTED QUERIES</p>
// //               <div className="flex flex-wrap gap-2">
// //                 {suggestedQueries.map((query, idx) => (
// //                   <button
// //                     key={idx}
// //                     onClick={() => setQuestion(query)}
// //                     className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${darkMode ? 'hover:bg-slate-700 border-slate-600 text-slate-300 hover:text-white' : 'hover:bg-blue-100 border-blue-300 text-blue-700 hover:text-blue-900'} border`}
// //                   >
// //                     {query}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </section>

// //         {/* Results Section */}
// //         <section>
// //           {results.length === 0 && !loading && !error && (
// //             <div className="text-center py-16">
// //               <div className={`inline-flex p-4 ${darkMode ? 'bg-slate-800/50' : 'bg-blue-50'} rounded-2xl mb-4`}>
// //                 <FileText className={`w-12 h-12 ${darkMode ? 'text-slate-500' : 'text-blue-400'}`} />
// //               </div>
// //               <p className={darkMode ? 'text-slate-400' : 'text-blue-600'}>
// //                 Enter a question above to search drug labels from DailyMed
// //               </p>
// //             </div>
// //           )}

// //           {loading && (
// //             <div className="flex flex-col items-center justify-center py-16">
// //               <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mb-4" />
// //               <p className="text-slate-400">Searching drug database...</p>
// //             </div>
// //           )}

// //           <div className="space-y-4">
// //             {results.map((ctx, idx) => {
// //               const isExpanded = expandedCards[idx];
// //               const shouldTruncate = ctx.text.length > 400;
// //               const displayText = isExpanded || !shouldTruncate 
// //                 ? ctx.text 
// //                 : ctx.text.slice(0, 400);

// //               return (
// //                 <article
// //                   key={idx}
// //                   className="bg-slate-800/50 backdrop-blur border border-slate-600 rounded-2xl p-6 hover:border-slate-500 hover:bg-slate-800/70 transition-all duration-200"
// //                 >
// //                   <div className="flex items-start justify-between gap-4 mb-3">
// //                     <h2 className="text-base font-semibold text-cyan-300">
// //                       {ctx.title || "Untitled Product"}
// //                     </h2>
// //                     <span className="px-2 py-1 bg-slate-700 rounded-lg text-xs text-slate-300 flex-shrink-0">
// //                       Result {idx + 1}
// //                     </span>
// //                   </div>
                  
// //                   <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
// //                     {displayText}
// //                     {shouldTruncate && !isExpanded && "..."}
// //                   </p>

// //                   {shouldTruncate && (
// //                     <button
// //                       onClick={() => toggleExpanded(idx)}
// //                       className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
// //                     >
// //                       {isExpanded ? (
// //                         <>
// //                           Show less <ChevronUp className="w-4 h-4" />
// //                         </>
// //                       ) : (
// //                         <>
// //                           Show more <ChevronDown className="w-4 h-4" />
// //                         </>
// //                       )}
// //                     </button>
// //                   )}
// //                 </article>
// //               );
// //             })}
// //           </div>
// //         </section>
// //       </main>

// //       {/* Footer */}
// //       <footer className="border-t border-slate-600 mt-16">
// //         <div className="max-w-6xl mx-auto px-6 py-6 text-center text-xs text-slate-500">
// //           Drug information retrieved from DailyMed database
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState } from "react";
// import {
//   Search,
//   Pill,
//   Loader2,
//   AlertCircle,
//   FileText,
//   ChevronDown,
//   ChevronUp,
//   Menu
// } from "lucide-react";

// const API_URL = "http://localhost:8000/ask";

// export default function App() {
//   const [question, setQuestion] = useState("");
//   const [topK, setTopK] = useState(5);
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);
//   const [expanded, setExpanded] = useState({});
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const handleSubmit = async () => {
//     if (!question.trim()) return;

//     setLoading(true);
//     setError(null);
//     setResults([]);
//     setExpanded({});

//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question, top_k: topK })
//       });

//       if (!res.ok) {
//         const text = await res.text();
//         throw new Error(`Backend error: ${res.status} ${text}`);
//       }

//       const data = await res.json();
//       setResults(data.contexts || []);
//     } catch (err) {
//       setError(err.message || "Unknown error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleExpand = (i) => {
//     setExpanded(prev => ({ ...prev, [i]: !prev[i] }));
//   };

//   return (
//     <div className="h-screen flex bg-gray-100 text-gray-800">
//       {/* Sidebar */}
//       {sidebarOpen && (
//         <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
//           <div className="p-6 border-b flex items-center gap-3">
//             <Pill className="w-6 h-6 text-blue-600" />
//             <h1 className="text-lg font-semibold">Drug Encyclopedia</h1>
//           </div>

//           <nav className="flex-1 p-4 space-y-2 text-sm">
//             <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
//               Dashboard
//             </button>
//             <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
//               Search Drugs
//             </button>
//             <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
//               Clinical Warnings
//             </button>
//             <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
//               Pediatric Dosing
//             </button>
//           </nav>

//           <div className="p-4 text-xs text-gray-400 border-t">
//             Powered by DailyMed RAG System
//           </div>
//         </aside>
//       )}

//       {/* Main Area */}
//       <div className="flex-1 flex flex-col">

//         {/* Navbar */}
//         <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
//           <div className="flex items-center gap-4">
//             <button onClick={() => setSidebarOpen(!sidebarOpen)}>
//               <Menu className="w-5 h-5 text-gray-600" />
//             </button>
//             <h2 className="font-medium text-gray-700">Search Drug Labels</h2>
//           </div>

//           <div className="text-sm text-gray-500">
//             Secure Medical Information Portal
//           </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1 overflow-y-auto p-8">

//           {/* Search Section */}
//           <div className="max-w-4xl mb-8">
//             <div className="relative">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 placeholder="Search indications, dosage, contraindications..."
//                 className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//             </div>

//             <div className="flex items-center gap-4 mt-4">
//               <div className="flex items-center gap-2 text-sm">
//                 <span>Results:</span>
//                 <input
//                   type="number"
//                   min={1}
//                   max={10}
//                   value={topK}
//                   onChange={(e) => setTopK(Number(e.target.value))}
//                   className="w-14 border rounded px-2 py-1"
//                 />
//               </div>

//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//               >
//                 {loading ? (
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                 ) : (
//                   "Search"
//                 )}
//               </button>
//             </div>

//             {error && (
//               <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 p-3 rounded">
//                 <AlertCircle className="w-4 h-4" />
//                 {error}
//               </div>
//             )}
//           </div>

//           {/* Results */}
//           <div className="max-w-4xl space-y-6">
//             {results.map((ctx, idx) => {
//               const isOpen = expanded[idx];
//               const truncate = ctx.text.length > 500;
//               const content = isOpen || !truncate
//                 ? ctx.text
//                 : ctx.text.slice(0, 500);

//               return (
//                 <div
//                   key={idx}
//                   className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition"
//                 >
//                   <div className="flex justify-between mb-3">
//                     <h3 className="font-semibold text-gray-800">
//                       {ctx.title || "Untitled Product"}
//                     </h3>
//                     <span className="text-xs text-gray-400">
//                       Result {idx + 1}
//                     </span>
//                   </div>

//                   <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
//                     {content}
//                     {truncate && !isOpen && "..."}
//                   </p>

//                   {truncate && (
//                     <button
//                       onClick={() => toggleExpand(idx)}
//                       className="mt-3 text-sm text-blue-600 flex items-center gap-1"
//                     >
//                       {isOpen ? (
//                         <>
//                           Show less <ChevronUp className="w-4 h-4" />
//                         </>
//                       ) : (
//                         <>
//                           Show more <ChevronDown className="w-4 h-4" />
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               );
//             })}

//             {!loading && results.length === 0 && (
//               <div className="text-center py-20 text-gray-400">
//                 <FileText className="mx-auto mb-4 w-10 h-10" />
//                 Enter a query to search the DailyMed database.
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";
import { fetchFilters, searchDrugs } from "./api";

export default function App() {
  const [filters, setFilters] = useState({
    section: "",
    file_name: ""
  });

  const [availableFilters, setAvailableFilters] = useState({
    sections: [],
    file_names: []
  });

  const [question, setQuestion] = useState("");
  const [topK, setTopK] = useState(5);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFilters()
      .then(setAvailableFilters)
      .catch(console.error);
  }, []);

  const handleSearch = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await searchDrugs({
        question,
        top_k: topK,
        section: filters.section || null,
        file_name: filters.file_name || null
      });

      setResults(data.contexts || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar
        filters={filters}
        setFilters={setFilters}
        availableFilters={availableFilters}
      />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-8 overflow-y-auto">
          <SearchBar
            question={question}
            setQuestion={setQuestion}
            topK={topK}
            setTopK={setTopK}
            onSearch={handleSearch}
            loading={loading}
          />

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
              {error}
            </div>
          )}

          <ResultsList results={results} loading={loading} />
        </main>
      </div>
    </div>
  );
}
