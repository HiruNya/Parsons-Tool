import { useState } from 'react';
import { useBackend } from '../data/BackendContext';
import ProblemInfoDetailedCard from '../components/problemInfoCard/problemInfoDetailedCard';
import ProblemInfoListCard from '../components/problemInfoCard/problemInfoListCard';

export default function StudentBrowseProblems() {
  const [selected, setSelected] = useState();

  // Use context to retrieve problem list from server
  const { problems } = useBackend();

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col bg-sky-600 w-full h-min mx-12 my-12 rounded-xl">
        {problems && problems.length > 0 ? (
          problems.map((problem, i) => (
            <ProblemInfoListCard problem={problem} setSelected={(problem) => setSelected(problem)} key={i} />
          ))
        ) : (
          <p className="p-2 text-white">No problems assigned</p>
        )}
      </div>
      <div className="w-full">{selected ? <ProblemInfoDetailedCard problem={selected} /> : <div></div>}</div>
    </div>
  );
}
