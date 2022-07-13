import { useLocation } from 'react-router-dom';
import ParsonsProblem from '../components/parsonsProblem';
import { useLogging } from '../loggers/logContext';

export default function ProblemEvaluation() {
  const location = useLocation();
  const { logSubmission } = useLogging();
  const problem = location.state.problem;

  return (
    <div className="flex flex-col ">
      <div className="my-4">
        <h1 className="mx-auto text-center my-4 font-semibold text-lg">{problem.name}</h1>
        <p className="w-10/12 flex-wrap mx-auto my-4 bg-stone-200 p-2 rounded-lg">{problem.description}</p>
      </div>
      <div className="mx-auto  w-9/12 my-2">
        <ParsonsProblem problem={problem.problem} />
      </div>
      <div className="mt-6 mx-auto flex flex-row space-between">
        <button
          className="px-3 py-1 mr-2 border-2 border-solid border-green-400 bg-green-400 rounded-full hover:bg-green-500"
          onClick={logSubmission}
        >
          Submit Attempt / Check
        </button>
        <button className="px-3 py-1 ml-2 border-2 border-solid border-red-400 bg-red-400 rounded-full hover:bg-red-500">
          Cancel / Quit
        </button>
      </div>
      <div className="mx-auto bg-stone-400 rounded-lg p-1 mt-5 w-10/12">
        <p className="mx-auto bg-stone-700 w-full text-white rounded p-2">Result console</p>
      </div>
    </div>
  );
}
