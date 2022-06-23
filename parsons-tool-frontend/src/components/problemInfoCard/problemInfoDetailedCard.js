import styles from "./problemInfoDetailedCard.module.css";


export default function ProblemInfoDetailedCard({problem}) {

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
            <button className={styles.solveBtn}>Solve</button>
          </div>
        </>
    );
}