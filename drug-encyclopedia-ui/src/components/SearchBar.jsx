import React from "react";
import { Search, Loader2 } from "lucide-react";

export default function SearchBar({
  question,
  setQuestion,
  topK,
  setTopK,
  onSearch,
  loading
}) {
  return (
    <div className="max-w-5xl flex items-center gap-4">
      
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Search indications, dosage, warnings..."
          className="w-full border rounded-lg pl-9 pr-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Results Selector */}
      <div className="flex items-center text-sm whitespace-nowrap">
        Results:
        <input
          type="number"
          min={1}
          max={10}
          value={topK}
          onChange={(e) => setTopK(Number(e.target.value))}
          className="ml-2 w-16 border rounded px-2 py-1"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={onSearch}
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center min-w-[90px]"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "Search"
        )}
      </button>
    </div>
  );
}
