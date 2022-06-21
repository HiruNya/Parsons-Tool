import { useState } from "react";
import ProblemInfoCard from "../components/problemInfoCard/problemInfoCard";
import styles from "./browseProblems.module.css"

function BrowseProblems({problemSet}) {
  const [problems, setProblems] = useState(problemSet.problems);
  return (
    <div className={styles.problemList}>
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
