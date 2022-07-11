export default function ProblemInfoListCard({ problem, setSelected }) {
  return (
    <>
      <div
        className="bg-sky-200 m-5 w-11/12 p-2 rounded-xl flex flex-row items-center"
        onClick={() => setSelected(problem)}
      >
        <div className="p-2 mx-4">
          <h1 className="text-xl">{problem.name}</h1>
          <h2>{problem.author}</h2>
          <h3 className="text-gray-500">{problem.tags.map((tag) => ' ' + tag + ',')}</h3>
        </div>
        <div className="p-2 ml-auto">
          <h3>{problem.variations.map((variation) => ' ' + variation + ', ')}</h3>
          <h2>{problem.language}</h2>
        </div>
        <button
          className="px-3 py-1 ml-auto mr-1 w-min h-min border-2 border-black bg-transparant rounded-full text-xl font-medium hover:text-white hover:border-white"
          onClick={() => setSelected(problem)}
        >
          {' '}
          &gt;{' '}
        </button>
      </div>
    </>
  );
}
