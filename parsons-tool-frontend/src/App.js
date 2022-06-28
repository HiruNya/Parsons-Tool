import "./App.css";
import { React } from "react";
import { Routes, Route } from "react-router-dom";
import ProblemEvaluation from "./pages/problemEvaluation";
import ProblemInfoCard from "./components/problemInfoCard/problemInfoCard";
import PageLayout from "./pages/PageLayout";
import StudentBrowseProblems from "./pages/studentBrowseProblems";
import data from "./data/recursion-parsons.json"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<ProblemInfoCard />} />
          <Route path="problems" element={<ProblemEvaluation />} />
          <Route path="student" element={<StudentBrowseProblems problems={data.problems}/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
