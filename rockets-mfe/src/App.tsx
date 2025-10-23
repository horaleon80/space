import React, { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { ViewProvider, useView } from "./contexts/ViewContext";
import { client } from "./graphql/client";
import List from "./components/List";

const RocketsContent: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    showActiveOnly,
    setShowActiveOnly,
  } = useView();

  useEffect(() => {
    const sendHeight = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage(
        {
          type: "iframe-height",
          source: "rockets",
          height: height,
        },
        "*"
      );
    };

    const timer = setTimeout(sendHeight, 300);
    return () => clearTimeout(timer);
  });

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Rockets</h2>

        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              View Mode
            </label>
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 text-sm font-medium ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } rounded-l-md transition`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 text-sm font-medium ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } rounded-r-md transition`}
              >
                List
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Name</option>
              <option value="cost">Cost per Launch</option>
              <option value="success_rate">Success Rate</option>
              <option value="first_flight">First Flight</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showActiveOnly}
                onChange={(e) => setShowActiveOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Active Only
              </span>
            </label>
          </div>
        </div>
      </div>

      <List />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ViewProvider>
        <RocketsContent />
      </ViewProvider>
    </ApolloProvider>
  );
};

export default App;
