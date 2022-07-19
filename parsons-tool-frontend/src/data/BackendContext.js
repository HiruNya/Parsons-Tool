import React, { useContext } from 'react';
import useGet from '../hooks/useGet';
import usePost from '../hooks/usePost';

const BackendContext = React.createContext({
  problems: [],
});

export const useBackend = () => useContext(BackendContext);

export const BackendContextProvider = ({ children }) => {
  // Currently URL is hardcoded, should change to use env variable
  const {
    data: problems,
    isLoading: isLoadingProblems,
    error: problemsErrorState,
  } = useGet('http://localhost:3001/student', []);

  const {
    response: executionResponse,
    isLoading: executionIsLoading,
    error: executionError,
    postData: sendExecutionRequest,
  } = usePost('http://localhost:3001/solve');

  const {
    response: submissionResponse,
    isLoading: submissionIsLoading,
    error: submissionError,
    postData: sendSubmissionRequest,
  } = usePost('http://localhost:3001/solve/submission');

  const {
    response: problemCreationResponse,
    isLoading: problemCreationIsLoading,
    error: problemCreationError,
    postData: sendProblemCreation,
  } = usePost('http://localhost:3001/problems/create');

  const context = {
    problems,
    isLoadingProblems,
    problemsErrorState,
    executionResponse,
    executionIsLoading,
    executionError,
    sendExecutionRequest,
    submissionResponse,
    submissionIsLoading,
    submissionError,
    sendSubmissionRequest,
    problemCreationResponse,
    problemCreationIsLoading,
    problemCreationError,
    sendProblemCreation,
  };

  return <BackendContext.Provider value={context}>{children}</BackendContext.Provider>;
};
