import React, { useState } from "react";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";

export default function ResultsList({ results, loading }) {
  const [expanded, setExpanded] = useState({});

  const toggle = (i) =>
    setExpanded(prev => ({ ...prev, [i]: !prev[i] }));

  if (loading) {
    return <div className="mt-10 text-gray-400">Searching...</div>;
  }

  if (!results.length) {
    return (
      <div className="mt-12 text-center text-gray-400">
        <FileText className="mx-auto mb-3 w-10 h-10" />
        Enter a query to retrieve drug information.
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-4xl space-y-6">
      {results.map((r, i) => {
        const isOpen = expanded[i];
        const truncated = r.text.length > 600;
        const display = isOpen || !truncated
          ? r.text
          : r.text.slice(0, 600);

        return (
          <div
            key={i}
            className="bg-white border rounded-lg p-6 shadow-sm"
          >
            <div className="mb-3">
              <h3 className="font-semibold text-gray-800">
                {r.title}
              </h3>
              <p className="text-xs text-gray-500">
                Section: {r.section}
              </p>
            </div>

            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
              {display}
              {truncated && !isOpen && "..."}
            </p>

            {truncated && (
              <button
                onClick={() => toggle(i)}
                className="mt-3 text-sm text-blue-600 flex items-center gap-1"
              >
                {isOpen ? (
                  <>Show less <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>Show more <ChevronDown className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
