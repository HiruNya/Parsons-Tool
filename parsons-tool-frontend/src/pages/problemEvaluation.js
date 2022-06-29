import { useLocation } from "react-router-dom";
import ParsonsProblem from "../components/parsonsProblem";

export default function ProblemEvaluation() {

    const location = useLocation();
    const problem = location.state.problem

  return (
    <div className="flex flex-col">
      <div className="my-4 mx-auto">
        <h1>{problem.name}</h1>
        <p>{problem.description}</p>
      </div>
      <div className="mx-auto">
        <ParsonsProblem problem={problem.problem}/>
      </div>
      <div className="mt-3 mx-auto">
        <button className="px-3 py-1 border-2 border-solid border-green-400 bg-green-400 rounded-full hover:bg-green-500">
          Submit Attempt ? Check
        </button>
        <button className="px-3 py-1 border-2 border-solid border-red-400 bg-red-400 rounded-full hover:bg-red-500">
          Cancel / Quit
        </button>
      </div>
    </div>
  );
}
