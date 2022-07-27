import React, { useContext } from 'react';
import useGet from '../hooks/useGet';
import usePost from '../hooks/usePost';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL || 'http://localhost:3001';

const BackendContext = React.createContext({
  problems: [],
});

export const useBackend = () => useContext(BackendContext);

export const BackendContextProvider = ({ children }) => {
  const {
    data: problems,
    isLoading: isLoadingProblems,
    error: problemsErrorState,
  } = useGet(apiServerUrl + '/student', []);

  const {
    response: executionResponse,
    isLoading: executionIsLoading,
    error: executionError,
    postData: sendExecutionRequest,
  } = usePost(apiServerUrl + '/solve');

  const {
    response: submissionResponse,
    isLoading: submissionIsLoading,
    error: submissionError,
    postData: sendSubmissionRequest,
  } = usePost(apiServerUrl + '/solve/submit');

  const {
    response: problemCreationResponse,
    isLoading: problemCreationIsLoading,
    error: problemCreationError,
    postData: sendProblemCreation,
  } = usePost(apiServerUrl + '/problems/create');

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
