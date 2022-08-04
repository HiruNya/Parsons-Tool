import { useLocation, useNavigate } from 'react-router-dom';
import ParsonsProblem from '../components/parsonsProblem';
import { useBackend } from '../data/BackendContext';
import { useAuth } from '../data/AuthContext';
import { useLogging } from '../loggers/logContext';
import { useProblems } from '../data/ProblemContext';

export default function ProblemEvaluation() {
  const location = useLocation();
  const { state, dataEvents, reset: resetLogging } = useLogging();
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
          <div className="mt-6 pl-8 mx-auto flex flex-row space-between">
            <button
              className="px-3 py-1 mr-2 border-2 border-solid border-yellow-400 bg-yellow-400 rounded-full hover:bg-yellow-500"
              onClick={() => sendExecutionRequest(state)}
            >
              Test Solution
            </button>
            <button
              className="px-3 py-1 mr-2 border-2 border-solid border-green-400 bg-green-400 rounded-full hover:bg-green-500"
              onClick={submitSolution}
            >
              Submit Solution
            </button>
          </div>
          <div className="mx-auto bg-stone-400 rounded-lg p-1 mt-5 w-10/12">
            <p className="mx-auto bg-stone-700 w-full text-white rounded p-2">Result console</p>
            {(executionIsLoading && 'Loading...') || (executionResponse && renderResult(executionResponse.data))}
          </div>
        </div>
      ) : (
        'It seems something went wrong when trying to load the problems'
      )}
    </>
  );
}

const renderResult = ({ result, actual, expected }) =>
  result === 'correct' ? (
    <div className={'mx-auto bg-green-300 w-full rounded p-2'}>Correct!</div>
  ) : (
    <div className={'mx-auto bg-red-300 w-full rounded p-2'}>
      Incorrect! Expected `{expected}`, Actual: `{actual}`
    </div>
  );
