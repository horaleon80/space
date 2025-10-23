import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterSuccess: 'all' | 'success' | 'failure';
  setFilterSuccess: (filter: 'all' | 'success' | 'failure') => void;
  limit: number;
  setLimit: (limit: number) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSuccess, setFilterSuccess] = useState<'all' | 'success' | 'failure'>('all');
  const [limit, setLimit] = useState(10);

  return (
    <FilterContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        filterSuccess,
        setFilterSuccess,
        limit,
        setLimit,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within FilterProvider');
  }
  return context;
};