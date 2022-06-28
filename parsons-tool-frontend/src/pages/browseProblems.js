import { useState } from "react";
import ProblemInfoCard from "../components/problemInfoCard/problemInfoCard";

function BrowseProblems() {
  const [problems, setProblems] = useState([]);

  return (
    <div className="mx-3 my-auto w-full h-full bg-black">
      {problems && problems.length > 0 ? (
        problems.map((problem, i) => (
          <ProblemInfoCard problem={problem} key={i} />
        ))
      ) : (
        <p>No problems found</p>
      )}
    </div>
  );
}

export default BrowseProblems;
