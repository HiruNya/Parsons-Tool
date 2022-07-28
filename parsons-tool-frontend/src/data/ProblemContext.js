import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useBackend } from './BackendContext';

const ProblemContext = React.createContext({
  currentProblem: {},
  problemSet: [],
});

export const useProblems = () => useContext(ProblemContext);

export const ProblemContextProvider = ({ children }) => {
  const [currentProblem, setCurrentProblem] = useState(null);
  const [problemIndex, setProblemIndex] = useState(0);
  const { problems } = useBackend();
  const { stateChange } = useAuth();

  function nextProblem() {
    if (problems && problemIndex < problems.length) {
      setProblemIndex(problemIndex + 1);
      setCurrentProblem(problems[problemIndex]);
    }
  }

  // Should set the first problem when problems loads for the first time
  useEffect(() => {
    if (problems && currentProblem === undefined) {
      setCurrentProblem(problems[problemIndex]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problems]);

  // On auth change reset state to not have lingering problems
  useEffect(() => {
    setCurrentProblem(undefined);
    setProblemIndex(0);
  }, [stateChange]);

  const context = {
    currentProblem,
    nextProblem,
  };

  return <ProblemContext.Provider value={context}>{children}</ProblemContext.Provider>;
};
