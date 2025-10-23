import React, { useState, useEffect, useRef } from "react";
import { ApolloProvider } from "@apollo/client";
import { FilterProvider, useFilter } from "./contexts/FilterContext";
import { client } from "./graphql/client";
import List from "./components/List";
import Detail from "./components/Detail";

interface Launch {
  id: string;
  mission_name: string;
  launch_date_local: string;
  launch_success: boolean | null;
  rocket: {
    rocket_name: string;
    rocket_type: string;
  };
  links: {
    mission_patch_small: string | null;
    article_link: string | null;
  };
  details: string | null;
}

const LaunchesContent: React.FC = () => {
  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);
  const {
    searchTerm,
    setSearchTerm,
    filterSuccess,
    setFilterSuccess,
  } = useFilter();
  const lastSentHeightRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const sendHeight = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        const height = Math.ceil(rect.height);

        if (Math.abs(height - lastSentHeightRef.current) > 5) {
          lastSentHeightRef.current = height;
          window.parent.postMessage(
            {
              type: "iframe-height",
              source: "launches",
              height: height,
            },
            "*"
          );
        }
      }
    }, 350);
  };

  useEffect(() => {
    if (selectedLaunch) {
      window.parent.postMessage(
        {
          type: "scroll-to-top",
          source: "launches",
        },
        "*"
      );
    }
    sendHeight();
  }, [selectedLaunch]);

  useEffect(() => {
    let hasInitialMeasurement = false;

    const observer = new MutationObserver(() => {
      if (!hasInitialMeasurement && contentRef.current) {
        const height = contentRef.current.getBoundingClientRect().height;
        if (height > 300) {
          hasInitialMeasurement = true;
          sendHeight();
          observer.disconnect();
        }
      }
    });

    if (contentRef.current) {
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
      });
    }

    const fallbackTimer = setTimeout(() => {
      if (!hasInitialMeasurement) {
        sendHeight();
      }
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div ref={contentRef} className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-0">Launches</h2>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Search missions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status Filter
              </label>
              <select
                value={filterSuccess}
                onChange={(e) =>
                  setFilterSuccess(
                    e.target.value as "all" | "success" | "failure"
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Launches</option>
                <option value="success">Successful Only</option>
                <option value="failure">Failed Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {selectedLaunch && (
        <Detail
          launch={selectedLaunch}
          onClose={() => setSelectedLaunch(null)}
        />
      )}

      <List onSelectLaunch={setSelectedLaunch} />
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
  }, []);

  return (
    <ApolloProvider client={client}>
      <FilterProvider>
        <LaunchesContent />
      </FilterProvider>
    </ApolloProvider>
  );
};

export default App;
