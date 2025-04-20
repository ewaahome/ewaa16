'use client';

import React, { createContext, useContext } from 'react';

// Mock data context
const StaticDataContext = createContext({
  isLoaded: true,
  currentUser: null,
  listings: [],
  reservations: []
});

export const useStaticData = () => useContext(StaticDataContext);

interface StaticDataProviderProps {
  children: React.ReactNode;
}

const StaticDataProvider: React.FC<StaticDataProviderProps> = ({ 
  children 
}) => {
  // Mock static data that would normally come from a backend
  const mockData = {
    isLoaded: true,
    currentUser: null,
    listings: [],
    reservations: []
  };

  return (
    <StaticDataContext.Provider value={mockData}>
      {children}
    </StaticDataContext.Provider>
  );
};

export default StaticDataProvider; 