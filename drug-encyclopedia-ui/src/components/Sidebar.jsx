import React from "react";

export default function Sidebar({ filters, setFilters, availableFilters }) {
  return (
    <aside className="w-72 bg-white border-r shadow-sm p-6 flex flex-col">
      <h2 className="text-sm font-semibold text-gray-600 mb-6">
        Filters
      </h2>

      <div className="space-y-6 flex-1">

        <div>
          <label className="text-xs font-medium text-gray-500">
            Section
          </label>
          <select
            value={filters.section}
            onChange={(e) =>
              setFilters(prev => ({ ...prev, section: e.target.value }))
            }
            className="w-full mt-2 border rounded p-2 text-sm"
          >
            <option value="">All Sections</option>
            {availableFilters.sections.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-500">
            Product
          </label>
          <select
            value={filters.file_name}
            onChange={(e) =>
              setFilters(prev => ({ ...prev, file_name: e.target.value }))
            }
            className="w-full mt-2 border rounded p-2 text-sm"
          >
            <option value="">All Products</option>
            {availableFilters.file_names.map((f, i) => (
              <option key={i} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setFilters({ section: "", file_name: "" })}
          className="w-full text-sm bg-gray-200 rounded p-2 hover:bg-gray-300"
        >
          Clear Filters
        </button>
      </div>

      <div className="text-xs text-gray-400 mt-8 border-t pt-4">
        Powered by DailyMed
      </div>
    </aside>
  );
}
