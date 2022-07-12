import { useNavigate } from 'react-router-dom';

export default function ProblemInfoDetailedCard({ problem }) {
  const navigate = useNavigate();
  function goToSolve() {
    navigate('/solve', { state: { problem } });
  }
  return (
    <>
      <div className="bg-gray-200 p-2 rounded-xl m-12 w-4/5 h-min flex flex-col items-center">
        <div className="p-2">
          <h1>{problem.name}</h1>
        </div>
        <div className="p-2">
          <p className="rounded bg-slate-300 p-12 mx-12 my-auto flex-wrap text-lg ">{problem.description}</p>
        </div>
        <button
          className="m-2 w-min h-min px-4 py-2 bg-text-lg bg-green-300 rounded-full hover:border-green-500 hover:border-2 hover:scale-110"
          onClick={() => goToSolve()}
        >
          Solve
        </button>
      </div>
    </>
  );
}
