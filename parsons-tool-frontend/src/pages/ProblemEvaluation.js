import { useLocation, useNavigate } from 'react-router-dom';
import ParsonsProblem from '../components/parsonsProblem';
import { useBackend } from '../data/BackendContext';
import { useAuth } from '../data/AuthContext';
import { useLogging } from '../loggers/logContext';
import { useProblems } from '../data/ProblemContext';
import ResultComponent from '../components/testCases/ResultComponent';

export default function ProblemEvaluation() {
  const location = useLocation();
  const { state, dataEvents, reset: resetLogging, logSubmission } = useLogging();
  const { sendSubmissionRequest, sendExecutionRequest, executionResponse, executionIsLoading, executionClear } =
    useBackend();
  const { uid } = useAuth();
  const { nextProblem } = useProblems();

  const problem = location.state.problem;

  const navigate = useNavigate();

  const submitSolution = () => {
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
    nextProblem();
    resetLogging();
    executionClear();
    navigate('/summary');
  };

  const executionResultCallback = () => {
    if (executionResponse) {
      logSubmission(executionResponse);
    }
  };

  return (
    <>
      {problem ? (
        <div className="flex flex-col ">
          <div className="my-4">
            <h1 className="mx-auto text-center my-4 font-semibold text-lg">{problem.name}</h1>
            <p className="w-10/12 flex-wrap mx-auto my-4 bg-stone-200 p-2 rounded-lg">{problem.description}</p>
          </div>
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
              (executionResponse && (
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
              ))}
          </div>
        </div>
      ) : (
        'It seems something went wrong when trying to load the problems'
      )}
    </>
  );
}
