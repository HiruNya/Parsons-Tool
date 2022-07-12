import { React } from "react";
import { Routes, Route } from "react-router-dom";
import ProblemInfoCard from "./components/problemInfoCard/problemInfoCard";
import PageLayout from "./pages/PageLayout";
import StudentBrowseProblems from "./pages/StudentBrowseProblems";
import data from "./data/recursion-parsons.json"
import ParsonsProblem from "./components/parsonsProblem";
import ProblemEvaluation from "./pages/ProblemEvaluation";
import ProblemGeneration from "./pages/ProblemGeneration";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<ProblemInfoCard />} />
          <Route path="problems" element={<ParsonsProblem problem={data.problems[1].problem}/>} />
          <Route path="student" element={<StudentBrowseProblems problems={data.problems}/>} />
          <Route path="solve" element={<ProblemEvaluation />} />
          <Route path="create" element={<ProblemGeneration addProblem={(newProblem)=> {console.log(newProblem)}}/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
