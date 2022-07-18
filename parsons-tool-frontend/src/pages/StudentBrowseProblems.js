import { useState, useContext } from 'react';
import { DataContext } from '../data/DataContext';
import ProblemInfoDetailedCard from '../components/problemInfoCard/problemInfoDetailedCard';
import ProblemInfoListCard from '../components/problemInfoCard/problemInfoListCard';

export default function StudentBrowseProblems() {
  const [selected, setSelected] = useState();
  const { problems } = useContext(DataContext);
  console.log(problems);

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col bg-sky-600 w-full h-min mx-12 my-12 rounded-xl">
        {problems.data && problems.data.length > 0 ? (
          problems.data.map((problem, i) => (
            <ProblemInfoListCard problem={problem} setSelected={(problem) => setSelected(problem)} key={i} />
          ))
        ) : (
          <p>No problems assigned</p>
        )}
      </div>
      <div className="w-full">{selected ? <ProblemInfoDetailedCard problem={selected} /> : <div></div>}</div>
    </div>
  );
}
