import styles from "./problemInfoDetailedCard.module.css";
import {useNavigate} from 'react-router-dom';


export default function ProblemInfoDetailedCard({problem}) {

    const navigate = useNavigate();
    function goToSolve() {
        navigate('/solve', {state: {problem}});
    }
    return (
        <>
          <div className={styles.problemInfoCard}>
            <div className={styles.problemInfoName}>
              <h1>{problem.name}</h1>
            </div>
            <div className={styles.problemInfoDetails}>
              <p className={styles.problemDescription}>
                {problem.description}
              </p>
            </div>
            <button className={styles.solveBtn} onClick={() => goToSolve()}>Solve</button>
          </div>
        </>
    );
}