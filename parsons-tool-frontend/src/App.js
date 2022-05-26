import "./App.css";
import { React } from "react";
import { Routes, Route } from "react-router-dom";
import ProblemEvaluation from "./pages/problemEvaluation";
import ProblemInfoCard from "./components/problemInfoCard/problemInfoCard";
import PageLayout from "./pages/PageLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<ProblemEvaluation />} />
          <Route path="problems" element={<ProblemInfoCard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
