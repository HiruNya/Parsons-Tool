import "./App.css";
import { React } from "react";
import { Routes, Route } from "react-router-dom";
import ProblemEvaluation from "./pages/problemEvaluation";
import PageLayout from "./pages/PageLayout";
import BrowseProblems from "./pages/browseProblems";
import data from "./data/recursion-parsons.json"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<BrowseProblems problemSet={data} />} />
          <Route path="problems" element={<ProblemEvaluation />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
