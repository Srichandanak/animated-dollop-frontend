import React, { useState } from "react";
import { Search, Pill, AlertCircle, Loader2, FileText, ChevronDown, ChevronUp } from "lucide-react";

const API_URL = "http://localhost:8000/ask";

function App() {
  const [question, setQuestion] = useState("");
  const [topK, setTopK] = useState(5);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

  const handleSubmit = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);
    setExpandedCards({});

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, top_k: topK }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Backend error: ${res.status} ${text}`);
      }

      const data = await res.json();
      setResults(data.contexts || []);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const toggleExpanded = (idx) => {
    setExpandedCards(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const suggestedQueries = [
    "dosage for joint pain homeopathic remedy",
    "side effects of aspirin",
    "warnings for blood pressure medication",
    "pediatric dosing information"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
              <Pill className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Drug Encyclopedia</h1>
              <p className="text-sm text-slate-400">Powered by DailyMed RAG System</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Search Section */}
        <section className="mb-8">
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about indications, dosage, warnings, side effects..."
                className="w-full bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-slate-900/50 backdrop-blur rounded-lg px-3 py-2 border border-slate-800/50">
                  <span className="text-xs font-medium text-slate-400">Results</span>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={topK}
                    onChange={(e) => setTopK(Number(e.target.value) || 5)}
                    className="w-12 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm text-white text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Search
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-3 bg-red-950/50 border border-red-800/50 rounded-xl p-4">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-300">Error</p>
                  <p className="text-sm text-red-400 mt-1">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Queries */}
          {results.length === 0 && !loading && (
            <div className="mt-6">
              <p className="text-xs font-medium text-slate-500 mb-3">SUGGESTED QUERIES</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.map((query, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuestion(query)}
                    className="px-3 py-1.5 bg-slate-900/50 hover:bg-slate-800/50 border border-slate-800/50 hover:border-slate-700/50 rounded-lg text-xs text-slate-300 transition-all"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Results Section */}
        <section>
          {results.length === 0 && !loading && !error && (
            <div className="text-center py-16">
              <div className="inline-flex p-4 bg-slate-900/50 rounded-2xl mb-4">
                <FileText className="w-12 h-12 text-slate-600" />
              </div>
              <p className="text-slate-400">
                Enter a question above to search drug labels from DailyMed
              </p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-slate-400">Searching drug database...</p>
            </div>
          )}

          <div className="space-y-4">
            {results.map((ctx, idx) => {
              const isExpanded = expandedCards[idx];
              const shouldTruncate = ctx.text.length > 400;
              const displayText = isExpanded || !shouldTruncate 
                ? ctx.text 
                : ctx.text.slice(0, 400);

              return (
                <article
                  key={idx}
                  className="bg-slate-900/50 backdrop-blur border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-base font-semibold text-blue-300">
                      {ctx.title || "Untitled Product"}
                    </h2>
                    <span className="px-2 py-1 bg-slate-800/50 rounded-lg text-xs text-slate-400 flex-shrink-0">
                      Result {idx + 1}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {displayText}
                    {shouldTruncate && !isExpanded && "..."}
                  </p>

                  {shouldTruncate && (
                    <button
                      onClick={() => toggleExpanded(idx)}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          Show less <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Show more <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-xs text-slate-500">
          Drug information retrieved from DailyMed database
        </div>
      </footer>
    </div>
  );
}

export default App;