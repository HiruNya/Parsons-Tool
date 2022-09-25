import { useCallback, useEffect, useState, useRef } from 'react';
import ParsonsProblem from '../components/parsonsProblem';
import { useBackend } from '../data/BackendContext';
import { useAuth } from '../data/AuthContext';
import { useLogging } from '../loggers/logContext';
import { useProblems } from '../data/ProblemContext';
import ResultComponent from '../components/testCases/ResultComponent';
import update from 'immutability-helper';
import Modal from '../components/Modal';
import ProblemProgressTracker from '../components/ProblemProgressTracker';

export default function ProblemEvaluation() {
  const { state, dataEvents, reset: resetLogging, logSubmission, logExecution } = useLogging();
  const {
    sendSubmissionRequest,
    sendExecutionRequest,
    executionResponse,
    executionIsLoading,
    executionClear,
    problems,
  } = useBackend();
  const { uid } = useAuth();
  const { nextProblem, currentProblem, problemIndex } = useProblems();

  const [problem, setProblem] = useState(null);
  const isFaded = currentProblem.problem.blocks.some((block) => block && block.fadedIndices.length > 0);

  const [modals, setModals] = useState({});
  const addModal = useCallback(
    (key, modal) => setModals((modals) => update(modals, { [key]: { $set: modal } })),
    [setModals],
  );
  const removeModal = useCallback((key) => setModals((modals) => update(modals, { $unset: [key] })), [setModals]);

  const resultRef = useRef(null);

  const executionResultCallback = useCallback(
    (res) => {
      logExecution(res.data);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behaviour: 'smooth' });
      }, 200);
    },
    [logExecution],
  );

  useEffect(() => {
    if (currentProblem) {
      setProblem(currentProblem);
    }
  }, [currentProblem]);

  const sendExecutionRequestOuter = useCallback(
    (state, executionResultCallback) => {
      if (state.solution.length < 1) {
        addModal('emptySolution', {
          title: "Your solution space doesn't have any blocks in it!",
          description:
            'Only the code on the solution space (right side) will be executed - are you sure you want to continue?',
          buttons: {
            yes: {
              name: 'Yes, Test It!',
              classes: ['bg-red-300  border-none'],
              onClick: () => {
                sendExecutionRequest(state, executionResultCallback);
                removeModal('emptySolution');
              },
            },
            no: {
              name: 'No, take me back',
              classes: ['bg-green-300 border-none'],
              onClick: () => removeModal('emptySolution'),
            },
          },
        });
        return;
      }
      sendExecutionRequest(state, executionResultCallback);
    },
    [sendExecutionRequest, addModal, removeModal],
  );

  const submitSolution = useCallback(() => {
    logSubmission();
    const newDataLog = {
      userId: uid,
      initialProblem: problem,
      blockState: state,
      dataEvents: dataEvents,
      timestamp: Date.now(),
    };

    //Callback function to print to console - checking that it is submitted
    const postCallback = () => {
      console.log(newDataLog);
    };
    //POST users interaction to the server
    sendSubmissionRequest(newDataLog, postCallback);

    //Reset page state, and set next problem
    nextProblem();
    resetLogging();
    executionClear();
  }, [
    dataEvents,
    executionClear,
    logSubmission,
    nextProblem,
    problem,
    resetLogging,
    sendSubmissionRequest,
    state,
    uid,
  ]);
  const submitSolutionOuter = useCallback(() => {
    if (
      !executionResponse ||
      !Array.isArray(executionResponse.data) ||
      executionResponse.data.some((r) => r.result !== 'correct')
    ) {
      addModal('failedTests', {
        title: "Some of your tests don't seem to have passed!",
        description:
          'If you haven\'t tested your code yet, click the "Test Code" button to test it. ' +
          'Otherwise, you may have not passed all the tests. ' +
          'Remember, you will not be able to revisit this problem if you go to the next one. ' +
          'Do you still want to go to the next problem?',
        buttons: {
          yes: {
            name: 'Yes, Submit It!',
            classes: ['bg-red-300 border-none'],
            onClick: () => {
              submitSolution();
              removeModal('failedTests');
            },
          },
          no: {
            name: 'No, take me back',
            classes: ['bg-green-300 border-none'],
            onClick: () => removeModal('failedTests'),
          },
        },
      });
      return;
    }
    return submitSolution();
  }, [submitSolution, addModal, executionResponse, removeModal]);

  return (
    <>
      {problem ? (
        <div className="flex flex-col ">
          <div className="my-4">
            <ProblemProgressTracker questionProgress={4 - problems.length + problemIndex} totalQuestions={4} />
            <h1 className="mx-auto text-center my-4 font-semibold text-lg">{problem.name}</h1>
            <p className="w-10/12 flex-wrap mx-auto my-2 bg-stone-200 p-2 rounded-lg">{problem.description}</p>
          </div>
          {isFaded ? (
            <div className=" w-max-10/12 mx-auto bg-blue-100 rounded-full px-3 py-1 mb-2">
              Fill out the blank sections{' '}
              <span className="bg-gray-200 rounded-full px-10 mx-2 border-gray-500 border-2" /> by clicking on them and
              entering the correct code to complete the problem.
            </div>
          ) : (
            ''
          )}
          <div className="mx-auto  w-9/12 my-2">
            <ParsonsProblem problem={problem.problem} problemId={problem['_id']} />
          </div>
          <div className="mt-6 mx-auto flex flex-row items-center">
            <button
              className="px-3 py-2 text-xl  bg-green-400 rounded-full hover:bg-green-500 "
              onClick={() => sendExecutionRequestOuter(state, executionResultCallback)}
            >
              Test My Code
            </button>
            <button
              className="px-3 py-1 absolute left-3/4  bg-orange-300 rounded-full hover:bg-orange-400"
              onClick={submitSolutionOuter}
            >
              Next Problem
            </button>
          </div>
          <div className="mx-auto bg-stone-400 rounded-lg p-1 mt-5 w-10/12">
            <p className="mx-auto bg-stone-700 w-full text-white rounded p-2">Results: </p>
            {(executionIsLoading && 'Loading...') ||
              (executionResponse &&
                ((Array.isArray(executionResponse.data) && (
                  <table className="w-full table-auto">
                    <tr className="bg-orange-300">
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Status</th>
                      <th className="p-2 text-left">Input</th>
                      <th className="p-2 text-left">Expected Output</th>
                      <th className="p-2 text-left">Actual Output</th>
                    </tr>
                    {executionResponse.data.map((result) => (
                      <ResultComponent result={result} />
                    ))}
                  </table>
                )) || (
                  <div className="bg-red-300 p-2 rounded">
                    <code className="whitespace-pre">{stripSorryAtStart(executionResponse.data)}</code>
                  </div>
                )))}
          </div>
        </div>
      ) : (
        'It seems something went wrong when trying to load the problems'
      )}
      <div className="h-1" ref={resultRef} />
      {Object.entries(modals).map(([k, v]) => (
        <Modal key={k} open={true} {...v} />
      ))}
    </>
  );
}

const stripTokenAtStart = (token) => (str) => {
  let newStr = str;
  if (!newStr) {
    return '';
  }
  return newStr.startsWith(token) ? newStr.substring(token.length).trimStart() : newStr;
};

const stripSorryAtStart = (str) => stripTokenAtStart('Sorry: ')(str);
