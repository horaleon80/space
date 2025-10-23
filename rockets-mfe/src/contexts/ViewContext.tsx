import React, { createContext, useContext, useState, ReactNode } from 'react';

type ViewMode = 'grid' | 'list';
export type SortBy = 'name' | 'cost' | 'success_rate' | 'first_flight';

interface ViewContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sortBy: SortBy;
  setSortBy: (sort: SortBy) => void;
  showActiveOnly: boolean;
  setShowActiveOnly: (show: boolean) => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  return (
    <ViewContext.Provider
      value={{
        viewMode,
        setViewMode,
        sortBy,
        setSortBy,
        showActiveOnly,
        setShowActiveOnly,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error('useView must be used within ViewProvider');
  }
  return context;
};
