import axios from 'axios';
import React, { useContext } from 'react';
import useGet from '../hooks/useGet';
import usePost from '../hooks/usePost';
import { useAuth } from './AuthContext';
import useGetRequest from '../hooks/useGetRequest';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL || 'http://localhost:3001';

// Query database if user id is present
export const queryUser = async (id) => {
  try {
    const response = await axios.get(apiServerUrl + '/student/' + id);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

// Post to database with user account
export const createUser = async (user) => {
  try {
    const response = await axios.post(apiServerUrl + '/student/new', user);
    console.log('[BackendContext.js]> User creation resp: ', response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const BackendContext = React.createContext({
  problems: [],
});

export const useBackend = () => useContext(BackendContext);

export const BackendContextProvider = ({ children }) => {
  const { group, stateChange } = useAuth();

  const {
    data: allProblems,
    isLoading: allProblemsIsLoading,
    error: allProblemsError,
  } = useGet(apiServerUrl + '/student/', [], null, true);

  const {
    data: problems,
    isLoading: isLoadingProblems,
    error: problemsErrorState,
  } = useGet(apiServerUrl + '/student/problems/' + group, [], stateChange, true);

  const {
    response: executionResponse,
    isLoading: executionIsLoading,
    error: executionError,
    postData: sendExecutionRequest,
    clearData: executionClear,
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

  const {
    data: dataLogs,
    isLoading: dataLogIsLoading,
    error: dataLogError,
  } = useGet(apiServerUrl + '/data/', [], null, true);

  const {
    data: submissionState,
    isLoading: submissionStateIsLoading,
    error: submissionStateError,
    fetchData: fetchSubmissionState,
  } = useGetRequest(apiServerUrl + '/student/completedProblems', [], null, true);

  const context = {
    allProblems,
    allProblemsIsLoading,
    allProblemsError,
    problems,
    isLoadingProblems,
    problemsErrorState,
    executionResponse,
    executionIsLoading,
    executionError,
    executionClear,
    sendExecutionRequest,
    submissionResponse,
    submissionIsLoading,
    submissionError,
    sendSubmissionRequest,
    problemCreationResponse,
    problemCreationIsLoading,
    problemCreationError,
    sendProblemCreation,
    dataLogs,
    dataLogIsLoading,
    dataLogError,
    submissionState,
    submissionStateIsLoading,
    submissionStateError,
    fetchSubmissionState,
  };

  return <BackendContext.Provider value={context}>{children}</BackendContext.Provider>;
};
