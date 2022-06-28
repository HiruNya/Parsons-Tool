import { useState } from "react";
import ProblemInfoDetailedCard from "../components/problemInfoCard/problemInfoDetailedCard";
import ProblemInfoListCard from "../components/problemInfoCard/problemInfoListCard";
import styles from "./studentBrowseProblems.module.css";

export default function StudentBrowseProblems({ problems }) {
    const [selected, setSelected] = useState();
  
    return (
    <div className={styles.studentProblemContainer}>
      <div className={styles.studentProblemList}>
        {problems && problems.length > 0 ? (
          problems.map((problem, i) => (
            <ProblemInfoListCard problem={problem} setSelected={(problem) => setSelected(problem)}key={i} />
          ))
        ) : (
          <p>No problems assigned</p>
        )}
      </div>
      <div className={styles.problemInfoView}>
        {
            selected ? (
                <ProblemInfoDetailedCard problem={selected} />
            ) : ( <div></div>)
        }
      </div>
    </div>
  );
}
