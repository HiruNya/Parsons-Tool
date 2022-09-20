import { useCallback, useEffect, useState, useRef } from 'react';
import ParsonsProblem from '../components/parsonsProblem';
import { useBackend } from '../data/BackendContext';
import { useAuth } from '../data/AuthContext';
import { useLogging } from '../loggers/logContext';
import { useProblems } from '../data/ProblemContext';
import ResultComponent from '../components/testCases/ResultComponent';
import ProblemProgressTracker from '../components/ProblemProgressTracker';

export default function ProblemEvaluation() {
  const { state, dataEvents, reset: resetLogging, logSubmission, logExecution } = useLogging();
  const { sendSubmissionRequest, sendExecutionRequest, executionResponse, executionIsLoading, executionClear } =
    useBackend();
  const { uid } = useAuth();
  const { nextProblem, currentProblem } = useProblems();

  const [problem, setProblem] = useState(null);
  const [isFaded, setIsFaded] = useState(false);

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
      currentProblem.problem.blocks.forEach((block) => {
        if (block && block.fadedIndices.length > 0) {
          setIsFaded(true);
        }
      });
    }
  }, [currentProblem]);

  const submitSolution = () => {
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
    setIsFaded(false);
    nextProblem();
    resetLogging();
    executionClear();
  };

  return (
    <>
      {problem ? (
        <div className="flex flex-col ">
          <div className="my-4">
            <ProblemProgressTracker questionProgress={1} totalQuestions={4} />
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
              onClick={() => sendExecutionRequest(state, executionResultCallback)}
            >
              Test My Code
            </button>
            <button
              className="px-3 py-1 absolute left-3/4  bg-orange-300 rounded-full hover:bg-orange-400"
              onClick={submitSolution}
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
