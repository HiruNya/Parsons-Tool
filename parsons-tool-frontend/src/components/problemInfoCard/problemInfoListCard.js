import styles from "./problemInfoListCard.module.css"

export default function ProblemInfoListCard({problem, setSelected}) {

    return (
        <>
          <div className={styles.problemInfoCard} onClick={()=> setSelected(problem)}>
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
          <button className={styles.problemInfoButton} onClick={() => setSelected(problem)}> &gt; </button>
        </>
      );
}