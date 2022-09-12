import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

import { useBackend } from './BackendContext';

const ProblemContext = React.createContext({
  currentProblem: {},
  problemSet: [],
});

export const useProblems = () => useContext(ProblemContext);

export const ProblemContextProvider = ({ children }) => {
  const [currentProblem, setCurrentProblem] = useState(null);
  const [problemIndex, setProblemIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const { problems } = useBackend();
  const { stateChange, signOut } = useAuth();
  const navigate = useNavigate();

  function nextProblem() {
    if (problems && problemIndex < problems.length - 1) {
      setProblemIndex(problemIndex + 1);
      setCurrentProblem(problems[problemIndex + 1]);
      navigate('/solve');
    } else if (problemIndex === problems.length - 1) {
      setProblemIndex(problems.length);
      setIsDone(true);
      navigate('/summary');
    }
  }

  function finish() {
    setCurrentProblem(null);
    setProblemIndex(0);
    setIsDone(false);
    signOut();
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
    setIsDone(false);
  }, [stateChange]);

  const context = {
    currentProblem,
    problemIndex,
    problemTotal: problems.length,
    isDone,
    nextProblem,
    finish,
  };

  return <ProblemContext.Provider value={context}>{children}</ProblemContext.Provider>;
};
