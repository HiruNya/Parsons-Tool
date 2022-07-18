import React from 'react';
import useGet from '../hooks/useGet';

const DataContext = React.createContext({
  problems: [],
});

function DataContextProvider({ children }) {
  const {
    data: problems,
    isLoading: isLoadingProblems,
    error: problemsErrorState,
  } = useGet('http://localhost:3001/student', []);

  const context = {
    problems,
    isLoadingProblems,
    problemsErrorState,
  };

  return <DataContext.Provider value={context}>{children}</DataContext.Provider>;
}

export { DataContext, DataContextProvider };
