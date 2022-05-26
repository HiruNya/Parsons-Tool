import { useState } from "react";
import ProblemInfoCard from "../components/problemInfoCard/problemInfoCard";

function BrowseProblems() {
  const [problems, setProblems] = useState([]);

  return (
    <div className="problemList">
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
