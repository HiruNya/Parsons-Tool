import styles from "./problemInfoCard.module.css";

function ProblemInfoCard({ problem }) {
  return (
    <>
      <div className={styles.problemInfoCard}>
        <div className={styles.problemInfoName}>
          <h1>{problem.name}</h1>
          <h2>{problem.author}</h2>
          <h3 className={styles.tags}>
            {problem.tags.map((tag) => " " + tag + ",")}
          </h3>
        </div>
        <div className={styles.problemInfoDetails}>
          <h3>
            {problem.variations.map((variation) => " " + variation + ", ")}
          </h3>
          <h2>{problem.language}</h2>
        </div>
      </div>
    </>
  );
}

export default ProblemInfoCard;
